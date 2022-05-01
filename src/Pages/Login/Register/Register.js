import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../Login/SocialLogin/SocialLogin';

const Register = () => {
    const [agree, setAgree] = useState(false);
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
        // this is one system of set the tearms and conditions
        // const agree = event.target.terms.checked;
        if(agree) {
            createUserWithEmailAndPassword(email, password)
        }
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

                <div class="form-check">
                <input onClick={() => setAgree(!agree)} class="form-check-input" type="checkbox" name="terms" value="" id='terms'/>
                {/* <label className={agree? "ps-2 text-primary" : "ps-2 text-danger"} htmlFor="terms">Accept Genius Car Terms and Conditions</label> */}
                <label className={`2px ${agree ? "text" : "text-danger"}`} htmlFor="terms">Accept Genius Car Terms and Conditions</label>
                </div>
                <input disabled={!agree} className='bg-primary rounded w-50 mx-auto border-0 text-white mt-2' type="submit" value="Register" />
            </form>
            <p>Already have an account?<Link to={"/login"} onClick={navigateLogin} className="text-primary pe-auto text-decoration-none">Please Register</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;