import React, { useEffect, useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../../Redux/actions/user";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const dispacth = useDispatch();
  const { user, isLoading, error, isAuthenticated,success } = useSelector((state) => state.user)


  const handleTab = (tab) => {
    setActiveTab(tab);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    // await axios.post(`http://localhost:4000/api/user/loginUser`,{
    //     email,
    //     password
    // }).then((res)=>{
    //   toast.success("Login Success!")
    //   console.log('res',res)
    //   navigate("/");
    // }).catch((err)=>{
    //   console.log(err);
    //    toast.error(err.response.data.message);
    // })
    dispacth(loginUser({ email, password })

    )

  }
  const handleRegister = (e) =>{
    e.preventDefault();
    dispatch(registerUser({name,email,password,address,phoneNumber}))


  }
  console.log('email', success)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

  }, [isAuthenticated,success]);

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
                  <input value={name} placeholder="User Name *" required
                    onChange={(e) => setName(e.target.value)}

                  />
                  <input value={email} placeholder="Email address *" required
                    onChange={(e) => setEmail(e.target.value)}

                  />
                  <input value={password} placeholder="Password *" required
                    onChange={(e) => setPassword(e.target.value)}

                  />
                  <input value={address} placeholder="Living Address*" required
                    onChange={(e) => setAddress(e.target.value)}

                  />
                  <input value={phoneNumber} placeholder="Phone Number" required
                    onChange={(e) => setPhoneNumber(e.target.value)}

                  />

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
                  <button
                  onClick={handleRegister}
                  >Register</button>
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
