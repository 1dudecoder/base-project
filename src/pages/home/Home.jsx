import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";

import leftside from "../../assets/leftside.png";
import apple from "../../assets/apple.svg";
import google from "../../assets/google.svg";
import baselogo from "../../assets/baselogo.svg";
import ziglogo from "../../assets/zig-logo.svg";
import git from "../../assets/git.svg";
import twitter from "../../assets/twitter.svg";
import discord from "../../assets/discord.svg";
import linkdin from "../../assets/linkdin.svg";

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState(false);
  const [errorstatus, setErrorstatus] = useState("");

  const handleSignGoogle = async () => {
    try {
      let data = await signInWithPopup(auth, provider);
      let auth2 = data.user.accessToken;

      console.log(auth2, "Setdata---");
      localStorage.setItem("token", auth2);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignApple = async () => {
    setErrorstatus("currently login by apple is not avaible");
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const user = userCredential.user;
      localStorage.setItem("token", userCredential.user.accessToken);
      console.log("User logged in:", user);
      setStatus(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error.message);
      setErrorstatus(error.message);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="top-div">
          <div className="logo">
            <img src={baselogo} alt="base-logo" />
            <div className="zip">
              <img src={ziglogo} alt="zip-logo" />
              <p className="base-text">Base</p>
            </div>
          </div>
        </div>
        <div className="left-div">
          <div className="logo">
            <img src={baselogo} alt="base-logo" />
            <div className="zip">
              <img src={ziglogo} alt="zip-logo" />
            </div>
          </div>
          <img src={leftside} alt="left side image" />

          <div className="base-header">
            <p className="base-header-text">BASE</p>
          </div>

          <div className="social-media-icons">
            <img src={git} alt="git" />
            <img src={twitter} alt="twitter" />
            <img src={linkdin} alt="linkdin" />
            <img src={discord} alt="discord" />
          </div>
        </div>

        <div className="right-div">
          <div className="auth-container">
            <p className="heading">Sign In</p>
            <p className="subheading">Sign in to your account</p>

            <div className="sign-button">
              {
                <div className="btn-sign" onClick={handleSignGoogle}>
                  <img src={google} alt="google-icon" />
                  <p>Sign in with Google</p>
                </div>
              }

              <div className="btn-sign" onClick={handleSignApple}>
                <img src={apple} alt="apple-icon" />
                <p>Sign in with Apple</p>
              </div>
            </div>

            <div className="sign-box">
              <p>Email address</p>
              <div className="inputs">
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <p>Password</p>
              <div className="inputs">
                <input type="text" onChange={(e) => setPass(e.target.value)} />
              </div>
              <p className="forget-pass">Forgot password?</p>

              <div className="sign-btn" onClick={handleLogin}>
                <p>Sign In</p>
              </div>
            </div>
          </div>
          {errorstatus && <p style={{ color: "red" }}>{errorstatus}</p>}

          <p className="registor">
            Don’t have an account?{" "}
            <Link to={"/signup"}>
              <span className="registor-text">Register here</span>
            </Link>
          </p>

          <div className="down-icons">
            <img
              src={git}
              alt="git"
              style={{ color: "red", fill: "red", filter: "red" }}
            />
            <img src={twitter} alt="twitter" />
            <img src={linkdin} alt="linkdin" />
            <img src={discord} alt="discord" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
