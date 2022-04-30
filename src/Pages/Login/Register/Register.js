import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../Login/SocialLogin/SocialLogin';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const navigateLogin = event => {
        navigate("/login");
    }
    const handleRegister = event => {
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password);

        createUserWithEmailAndPassword(email, password)
        event.preventDefault();
    }
    if(user) {
        navigate("/home");
    }
    return (
        <div className='register-form'>
            <h2 className='text-center mt-5'>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input  type="text" name="name" id="" placeholder='Your Name' required/>
                <input  type="email" name="email" id="" placeholder='Email Address' required/>
                <input  type="password" name="password" id="" placeholder='Your Password' required/>
                <input className='bg-primary rounded border-0 text-white' type="submit" value="Register" />
            </form>
            <p>Already have an account?<Link to={"/login"} onClick={navigateLogin} className="text-danger pe-auto text-decoration-none">Please Register</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;