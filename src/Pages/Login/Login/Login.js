import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from "../../../firebase.init";
import SocialLogin from "./SocialLogin/SocialLogin";
import { async } from "@firebase/util";
import Loading from "../../Shared/Loading/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
import PageTitle from "../../Shared/PageTitle/PageTitle";

const Login = () => {
  <PageTitle title={"Login"}></PageTitle>
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();

    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    let errorElement;
    if (error) {
      errorElement = <p className="text-danger">Error: {error?.message}</p>
  }
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";
    const navigateRegister = event => {
        navigate("/register")
    }
    if(loading || sending) {
      return <Loading></Loading>
    }
    if(user) {
      navigate(from, { replace: true });
    }
    const resetPassword = async() => {
      const email = emailRef.current.value;
      if(email) {
        await sendPasswordResetEmail(email);
        toast('Sent email');
      } else {
        toast("Please enter your email");
      }
    }
    if(user) {
      console.log("Login Information", user);
    }
    const handleSubmit = event => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // console.log(email, password);
        signInWithEmailAndPassword(email, password)
        event.preventDefault();
    }
  return (
    <div className="container w-50 mx-auto">
      <h2 className="text-primary text-center">Please Login</h2>
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
        </Form.Group>
        <Button  variant="primary w-50 d-block p-2 mb-2 mx-auto" type="submit">
          Login
        </Button>
      </Form>
      {errorElement}
      <p>New to genius car?<Link to={"/register"} onClick={navigateRegister} className="text-primary pe-auto text-decoration-none">Please Register</Link></p>
      <p>Forget Password?<button  onClick={resetPassword} className="btn btn-link ms-n5 p-0 text-primary pe-auto text-decoration-none">Reset Password</button></p>
      <SocialLogin></SocialLogin>
      <ToastContainer />
    </div>
  );
};

export default Login;
