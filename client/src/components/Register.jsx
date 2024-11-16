import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Validator from "../contexts/Validator";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios.js";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";
import { Card, CardBody, CardFooter, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, CardHeader} from "@nextui-org/react";
import MailIcon from '../assets/MailIcon';
import { EyeFilledIcon } from '../assets/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon';
import GoogleIcon from '../assets/GoogleIcon';
import { motion, AnimatePresence, spring } from 'framer-motion';
import OtpForm from "./OtpForm";
import { Vortex } from "./Vortex.jsx";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState("");
  const navigateTo = useNavigate();
  const { user, setUser } = useGlobalContext();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [verifiedOtp, setVerifiedOtp] = useState('');

  useEffect(() => {
    if (user) {
      toast("Already Logged in.", { icon: '⚠️' })
      navigateTo('/user/home');
    }
  });

  const handleOtpVerification = (otp) => {
    setVerifiedOtp(otp);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    const validationErrors = Validator({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(validationErrors);
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();

    const validationErrors = Validator(form);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      try {
        const res = await fetch( 'http://127.0.0.1:5000/user/verifymail', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "name": form.name, "email": form.email 
            }),
        });
        const result = res.data;
        setIsLoading(false);
        onOpen();
      } catch (error) {
        setIsLoading(false);
        setServerMsg(
          error.response.data.message || "Server error please try again later"
        );
        toast.error("Server error please try again later");
      }
    } else {
      setErrors(validationErrors);
    }
  }

  const handleSumbmit = async () => {
    const validationErrors = Validator(form);
    if (Object.keys(validationErrors).length === 0 && verifiedOtp.length === 6) {
      setIsLoading(true);

      try {
        const res = await axios.post("/user/signup", {form: form, otp: verifiedOtp});
        const result = res.data;
        localStorage.setItem("user", JSON.stringify({ ...result }));
        setUser(JSON.parse(localStorage.getItem("user")));
        toast.success("Registration successful!");
        setIsLoading(false);
        navigateTo("/user/home");
      } catch (error) {
        setIsLoading(false);
        setServerMsg(
          error.response.data.message || "Server error please try again later"
        );
        toast.error("Server error please try again later");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const googleSignin = async (e) => {
    e.preventDefault();
    console.log("Google Register");
  };

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

      <Card className="w-[700px] h-full">
        <CardHeader>
          <p className="text-[32px] font-extrabold text-center w-full text-red-600">Register</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleEmailVerification} className="flex flex-col justify-center align-middle items-center gap-2">
            <div className="flex flex-wrap gap-1">
              <div>
                <Input placeholder="Enter your name..." size='lg' labelPlacement="outside" startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} type="name" label="Name" name="name" id="name" value={form.name} onChange={handleChange} isInvalid={errors.name ? true : false} isRequired className="m-2 w-[300px]" />
                <AnimatePresence>
                  {errors.name && 
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="m-2 text-red-500 text-sm [text-shadow:_0_10px_10px_rgb(255_0_0_/_60%)]"
                    >
                      {errors.name}
                    </motion.div>
                  }
                </AnimatePresence>
              </div>
              <div>
                <Input placeholder="Enter your email..." size='lg' labelPlacement="outside" startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} type="email" label="Email" name="email" id="email" value={form.email} onChange={handleChange} isInvalid={errors.email ? true : false} isRequired className="m-2 w-[300px]" />
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
                </AnimatePresence>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <div>
                <Input placeholder="Set new password..." size='lg' labelPlacement="outside" startContent={ <button className="focus:outline-none" type="button" onClick={toggleVisibility}> {isVisible ? ( <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" /> ) : ( <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" /> )} </button> } type="password" label="Password" name="password" id="password" value={form.password} onChange={handleChange} isInvalid={errors.password ? true : false} isRequired className="m-2 w-[300px]" />
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
                </AnimatePresence>
              </div>
              <div>
                <Input placeholder="Repeat password..." size='lg' labelPlacement="outside" startContent={ <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" /> } type="password" label="Confirm Password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} isInvalid={errors.confirmPassword ? true : false} isRequired className="m-2 w-[300px]" />
                <AnimatePresence>
                  {errors.confirmPassword && 
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="m-2 text-red-500 text-sm [text-shadow:_0_10px_10px_rgb(255_0_0_/_60%)]"
                    >
                      {errors.confirmPassword}
                    </motion.div>
                  }
                </AnimatePresence>
              </div>
            </div><br />
            <Button type="submit" className="flex m-2" color="primary" variant="shadow" isLoading={isLoading} >
              Sign up
            </Button><br />
            <Link to='/auth/login' aria-label='page'>Already have an Account? Login here.</Link>
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
          </Button>
        </CardFooter>
      </Card>
      
      <Modal 
        backdrop="opaque"
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">Verify Mail</ModalHeader>
              <ModalBody className="z-[999]">
                <OtpForm onVerify={handleOtpVerification} />
              </ModalBody>
              <ModalFooter className="flex justify-center items-center">
                <Button isLoading={isLoading} color="primary" variant="shadow" onPress={handleSumbmit}>Submit</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Register;