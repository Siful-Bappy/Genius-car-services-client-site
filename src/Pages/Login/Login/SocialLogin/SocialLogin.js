import React from "react";
import google from "../../../../images/social/google.png"
import facebook from "../../../../images/social/facebook.png"
import github from "../../../../images/social/github.png"
import { useSignInWithGoogle, useSignInWithGithub } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";

const SocialLogin = () => {
  const navigate = useNavigate();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);

  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  let errorElement;
  if(loading || loading1) {
    return <Loading></Loading>
  }
  if (error || error1) {
      errorElement = <p className="text-danger">Error: {error?.message} {error1?.message} </p>
  }
  if (user || user1) {
    navigate(from, { replace: true });
  }
  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
        <p className="mt-2 px-2">or</p>
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
      </div>
      {errorElement}
      <div>
          <button onClick={() => signInWithGoogle()} className="btn-info w-50 p-3 rounded border-0 d-block mx-auto my-2">
              <img style={{width:"30px"}} src={google} alt="" />
              <span className="px-2">Google Sign In</span>
            </button>
          <button className="btn-info w-50 p-1 rounded border-0 d-block mx-auto my-2">
              <img style={{width:"50px"}} src={facebook} alt="" />
              <span className="px-1">Facebook Sign In</span>
            </button>
          <button onClick={() => signInWithGithub()} className="btn-info w-50 p-1 rounded border-0 d-block mx-auto">
              <img style={{width:"50px"}} src={github} alt="" />
              <span className="px-1">Github Sign In</span>
            </button>
      </div>
    </div>
  );
};

export default SocialLogin;
