import React from "react";

const SocialLogin = () => {
  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
        <p className="mt-2 px-2">or</p>
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
      </div>
      <div>
          <button className="btn-primary w-50 p-3 rounded border-0">Google Sign In</button>
      </div>
    </div>
  );
};

export default SocialLogin;
