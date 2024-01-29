import React, { useState } from "react";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "./Signup.css";

import leftside from "../../assets/leftside.png";
import apple from "../../assets/apple.svg";
import google from "../../assets/google.svg";
import baselogo from "../../assets/baselogo.svg";
import ziglogo from "../../assets/zig-logo.svg";
import git from "../../assets/git.svg";
import twitter from "../../assets/twitter.svg";
import discord from "../../assets/discord.svg";
import linkdin from "../../assets/linkdin.svg";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [status, setStatus] = useState("");
  const [errorstatus, setErrorstatus] = useState("");

  const handleSignUp = async () => {

    try {
      if (pass == cpass) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );
        console.log("User signed up:", userCredential.user);
        setStatus("signUp succesfull please go to login page");
        setErrorstatus("");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.log("password and conform password not same");
        setErrorstatus("password and conform password not same");
      }
    } catch (error) {
      console.error("Error during sign up:", error.message);
      setErrorstatus(error.message);
    }
  };

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
            <p className="heading">Sign Up</p>
            <p className="subheading">Sign Up to your account</p>

            <div className="sign-box">
              <p>Email address</p>
              <div className="inputs">
                <input
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <p>Password</p>
              <div className="inputs">
                <input
                  type="text"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </div>

              <p>Conform Password</p>
              <div className="inputs">
                <input
                  type="text"
                  onChange={(e) => {
                    setCpass(e.target.value);
                  }}
                />
              </div>

              <div className="sign-btn" onClick={handleSignUp}>
                <p>Sign Up</p>
              </div>
            </div>
          </div>

          {errorstatus && <p style={{ color: "red" }}>{errorstatus}</p>}
          {status && <p style={{ color: "green" }}>{status}</p>}

          <p className="registor">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <span className="registor-text">Go to Login page</span>
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

export default Signup;
