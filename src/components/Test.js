import React from 'react';
import Tilt from 'react-parallax-tilt';
import log from "./flig.jpg"

const Login = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">

          {/* Tilt effect here */}
          <Tilt  className="login100-pic" style={{border:"1px solid"}}>
            <img src={log} alt="Login Visual" style={{width:"200px", padding:"50px"}} />
          </Tilt>

          <form className="login100-form validate-form">
            <span className="login100-form-title">Member Login</span>

            <div className="wrap-input100">
              <input className="input100" type="text" name="email" placeholder="Email" />
              <span className="focus-input100"></span>
              <span className="symbol-input100"><i className="fa fa-envelope" aria-hidden="true"></i></span>
            </div>

            <div className="wrap-input100">
              <input className="input100" type="password" name="pass" placeholder="Password" />
              <span className="focus-input100"></span>
              <span className="symbol-input100"><i className="fa fa-lock" aria-hidden="true"></i></span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Login</button>
            </div>

            <div className="text-center p-t-12">
              <span className="txt1">Forgot</span>
              <a className="txt2" href="#">Username / Password?</a>
            </div>

            <div className="text-center p-t-136">
              <a className="txt2" href="#">
                Create your Account <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
