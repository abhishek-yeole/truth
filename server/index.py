from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import google.generativeai as genai
import urllib.parse
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from middleware.authUser import auth_user
from datetime import timedelta 
import json
from bson import ObjectId, json_util
from email.message import EmailMessage
import smtplib
import ssl
from dotenv import load_dotenv
import random
import os
import re
import requests
import time

load_dotenv()

app = Flask(__name__)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)


app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET')
CORS(app,resources={r"/*":{"origins":"*"}})

# MongoDB configuration
username = urllib.parse.quote_plus(os.getenv('MONGO_USERNAME'))
password = urllib.parse.quote_plus(os.getenv('MONGO_PASSWORD'))
restUri = os.getenv('REST_URI')

uri = f'mongodb+srv://{username}:{password}{restUri}'

client = MongoClient(uri)
db = client.Truth
users_collection = db["users"]
otps_collection = db['otps']

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')

genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
  "temperature": 0.8,
  "top_p": 1,
  "top_k": 40,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel('gemini-1.5-flash', generation_config=generation_config, safety_settings=safety_settings)

# Caches to reduce no of queries to MongoDB...
user_id_ping = {'current': 0}
user_chats = {}

@app.route('/')
def index():
    return "Server is Running..."

# User Routes
@app.route('/user/verifymail', methods=['POST'])
def verifymail():
    data = request.json
    name = data.get('name')
    email = data.get('email')

    if not email:
        return jsonify({"error": "Invalid email"}), 400

    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        return jsonify({"message": "User already exists"}), 404
    
    msg = EmailMessage()

    otp = str(random.randint(100000, 999999))
    msg["Subject"] = "Truth Verification"
    msg["From"] = "Truth Team"
    msg["To"] = email

    html_content = render_template('email.html', name=name, otp=otp)
    msg.set_content(html_content, subtype='html')

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login('smilecheck100@gmail.com', os.getenv('GMAIL_SSL_KEY'))
        smtp.send_message(msg)

    otps_collection.insert_one({"email": email, "otp": otp})

    return jsonify({"success": True}), 200


@app.route('/user/signup', methods=['POST'])
def signup():
    data = request.json
    form = data.get('form')
    name = form['name']
    email = form['email']
    password = form['password']
    otp = data.get('otp')

    if not email:
        return jsonify({"error": "Invalid email"}), 400
    
    stored_otp = otps_collection.find_one({"email": email}, sort=[('_id', -1)])

    if stored_otp['otp'] == otp:
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        result = users_collection.insert_one({
            "name": name,
            "email": email,
            "password": hashed_password
        })

        expires = timedelta(days=7)
        access_token = create_access_token(identity={"email": email, "id": str(result.inserted_id)}, expires_delta=expires)

        res = {"name": name, "email": email, "userId": str(result.inserted_id)}
        
        return jsonify({"result": res, "token": access_token}), 201

    else:
        return jsonify({"error": "Invalid otp"}), 400


@app.route('/user/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})

    if not user:
        return jsonify({"message": "User doesn't exist"}), 404

    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid Credentials"}), 404

    expires = timedelta(days=7)
    access_token = create_access_token(identity={"email": user['email'], "id": str(user['_id'])}, expires_delta=expires)

    res = {"name": user['name'], "email": user['email'], "userId": str(user['_id'])}

    return jsonify({"result": res, "token": access_token}), 200


@app.route('/user/delete', methods=['POST'])
@auth_user
def delete_account():
    email = request.email
    print(email)
    try:
        result = users_collection.delete_one({"email": email})
        if result.deleted_count == 1:
            return jsonify({"result": True}), 200
        else:
            return jsonify({"result": False, "message": "User not found"}), 404
    except Exception as e:
        print(e)
        return jsonify({"message": "Something went wrong"}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')