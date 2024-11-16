import React, { useEffect, useState } from 'react'
import {Button, Card, CardHeader, CardBody, CardFooter, Input} from "@nextui-org/react";
import Loader from './Loader';
import Validator from "../contexts/Validator";
import { useGlobalContext } from "../contexts/GlobalContext";
import { toast } from "react-hot-toast";
import { useTheme } from 'next-themes';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../axios.js";
import MailIcon from '../assets/MailIcon';
import { EyeFilledIcon } from '../assets/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon';
import GoogleIcon from '../assets/GoogleIcon';
import { motion, AnimatePresence, spring } from 'framer-motion';
import { Vortex } from './Vortex.jsx';

const initialForm = {
  email: "",
  password: "",
};

const Login = () => {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState(null);
  const navigateTo = useNavigate();
  const { user, setUser } = useGlobalContext();
  
  useEffect(() => {
    if (user) {
      navigateTo('/user/home');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    const validationErrors = Validator({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(validationErrors);
  };

  const handleSumbmit = async (e) => {
    e.preventDefault();

    const validationErrors = Validator(form);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      try {
        const res = await axios.post("/user/signin", form);
        const result = res.data;
        localStorage.setItem("user", JSON.stringify({ ...result }));
        setUser(JSON.parse(localStorage.getItem("user")));
        toast.success("Login successful!");
        setIsLoading(false);
        navigateTo("/user/home");
      } catch (error) {
        setIsLoading(false);
        setServerMsg(
          error.response.data.message || "Server error please try again later"
        );
        toast.error(
          error.response.data.message || "Server error please try again later"
        );
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const googleSignin = async (e) => {
    e.preventDefault();
    console.log("Google Signed in")
  }

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [showVortex, setShowVortex] = useState(false);
  useEffect(() => {
    const interval = setTimeout(() => {
      setShowVortex(true);
    }, 200);
  }, []);

  return (
    <>
      {isLoading ? <Loader width="500px" height="250px" /> : null}
      <Card className="w-[400px] h-full">
        <CardHeader>
          <p className="text-[32px] font-extrabold text-center w-full text-red-600">Login</p>
        </CardHeader>
        <CardBody>
        <form onSubmit={handleSumbmit} className="flex flex-col justify-center align-middle items-center">
          <Input placeholder="Enter your email..." size='lg' labelPlacement="outside" startContent={ <MailIcon className="text-2xl text-neutral-500 dark:text-neutral-300 pointer-events-none flex-shrink-0" /> } type="email" label="Email" name="email" id="email" value={form.email} onChange={handleChange} isInvalid={errors.email ? true : false} isRequired className="m-3 w-[300px]" />
          <AnimatePresence>
            {errors.email && 
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="m-2 text-red-500 text-sm [text-shadow:_0_10px_10px_rgb(255_0_0_/_60%)]"
              >
                {errors.email}
              </motion.div>
            }
          </AnimatePresence><br />
          <Input placeholder="Enter your password..." size='lg' labelPlacement="outside" startContent={ <button className="focus:outline-none" type="button" onClick={toggleVisibility}> {isVisible ? ( <EyeSlashFilledIcon className="text-2xl text-neutral-500 dark:text-neutral-300 pointer-events-none" /> ) : ( <EyeFilledIcon className="text-2xl text-neutral-500 dark:text-neutral-300 pointer-events-none" /> )} </button> } type={isVisible ? "text" : "password"} label="Password" name="password" id="password" value={form.password} onChange={handleChange} isInvalid={errors.password ? true : false} isRequired className="m-3 w-[300px]" />
          <AnimatePresence>
            {errors.password && 
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="m-2 text-red-500 text-sm [text-shadow:_0_10px_10px_rgb(255_0_0_/_60%)]"
              >
                {errors.password}
              </motion.div>
            }
          </AnimatePresence><br />
          <Button type="submit" className="flex m-2 " color="primary" variant="shadow" isLoading={isLoading} >
            Sign in
          </Button><br />
          <Link to='/auth/register' aria-label='page'>Don't have an Account? Register here.</Link>
          <AnimatePresence>
            {serverMsg && 
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="m-2 text-red-500 text-sm [text-shadow:_0_10px_10px_rgb(255_0_0_/_60%)]"
              >
                {serverMsg}
              </motion.div>
            }
          </AnimatePresence>
        </form>
        </CardBody>
        <CardFooter className="flex flex-col justify-center align-middle items-center">
          <Button onClick={googleSignin} className="flex m-2" color="secondary" variant="shadow" isLoading={isLoading} startContent={<GoogleIcon />} >
            Sign in with Google
          </Button><br />
        </CardFooter>
      </Card>
    </>
  )
}

export default Login