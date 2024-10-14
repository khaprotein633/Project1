import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const handleTab = (tab) => {
    setActiveTab(tab);
  };
  const handleLogin = async(e) =>{
    e.preventDefault();
    await axios.post(`http://localhost:4000/users/loginUser`,{
        email,
        password
    }).then((res)=>{
      toast.success("Login Success!")
      console.log('res',res)
      navigate("/");
    }).catch((err)=>{
      console.log(err);
       toast.error(err.response.data.message);
    })
  }
  console.log('email', password,email)

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* login */}

            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form>
                  <input value={email} placeholder="Email address *" required
                                      onChange={(e) => setEmail(e.target.value)}

                  />
                  <input value={password} placeholder="Password *" required
                                                        onChange={(e) => setPassword(e.target.value)}

                  />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button
                  onClick={handleLogin}
                  >Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* sign up  */}

            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form>
                  <input type="text" placeholder="Username *" required />
                  <input type="email" placeholder="Email address *" required />
                  <input type="password" placeholder="Password *" required />
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our
                    <Link
                      to="/terms"
                      style={{ textDecoration: "none", color: "#c32929" }}
                    >
                      {" "}
                      privacy policy
                    </Link>
                    .
                  </p>
                  <button>Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
