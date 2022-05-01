import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../Login/SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';
import PageTitle from '../../Shared/PageTitle/PageTitle';

const Register = () => {
    <PageTitle title={"Register"}></PageTitle>
    const [agree, setAgree] = useState(false);
    const [ createUserWithEmailAndPassword, user, loading, error ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const navigateLogin = event => {
        navigate("/login");
    }
    if(loading || updating) {
        return <Loading></Loading>
    }
    
    const handleRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const agree = event.target.terms.checked;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        console.log('Updated profile');
        navigate('/home');
    }
    if (user) {
        console.log('user', user);  
    }
    return (
        <div className='register-form'>
            <h2 className='text-center mt-5'>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input  type="text" name="name" id="" placeholder='Your Name' required/>
                <input  type="email" name="email" id="" placeholder='Email Address' required/>
                <input  type="password" name="password" id="" placeholder='Your Password' required/>

                <div className="form-check">
                <input onClick={() => setAgree(!agree)} className="form-check-input" type="checkbox" name="terms" value="" id='terms'/>
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