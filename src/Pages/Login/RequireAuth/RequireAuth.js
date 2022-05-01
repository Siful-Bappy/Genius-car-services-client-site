import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';

const RequireAuth = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

    // console.log("inside require auth", user);
    if(loading) {
        return <Loading></Loading>
    }
    // console.log(user);
    if(!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    if(!user.emailVerified) {
        return (
            <div className='text-center mt-5'>
                <h3 className='text-danger'>Your Email is not verified!!!</h3>
                <h5 className='text-success'>Please verify your email address</h5>
                <button className='btn btn-primary' onClick={async() => {
                    await sendEmailVerification();
                    toast('Sent email');}
                }>Send verification email Agin</button>
                <ToastContainer />
            </div>
        )
    }

    return children;
};

export default RequireAuth;