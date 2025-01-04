import React, { useEffect, useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
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

  const { user, isLoading, error, isAuthenticated, success } = useSelector((state) => state.user);

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu!");
      return; 
    }
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !address || !phoneNumber) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const usernameRegex = /^[a-zA-Z]+$/;

    if (!usernameRegex.test(name)) {
      toast.error("Tên tài khoản chỉ được chứa các chữ cái (không bao gồm số hoặc ký tự đặc biệt)");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email Không hợp lệ!");
      return;
    }


    const passwordRegex = /^[A-Za-z0-9]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Mật khẩu phải có 6 ký tự gồm chữ và số");
      return;
    }


    const phoneRegex = /^(0(3[2-9]|5[2-9]|7[0|6-9]|8[1-9]|9[0-9]))\d{7}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    dispatch(registerUser({ name, email, password, address, phoneNumber }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Đăng ký thành công, vui lòng đăng nhập.");
    }
  }, [isAuthenticated, success, error, navigate]);

  return (
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
                <input value={email} placeholder="Email address *" required onChange={(e) => setEmail(e.target.value)} />
                <input value={password} placeholder="Password *" required onChange={(e) => setPassword(e.target.value)} />
                <div className="loginSignUpForgetPass">
                  <label>
                    <input type="checkbox" className="brandRadio" />
                    <p>Remember me</p>
                  </label>
                  <p>
                    <Link to="/resetPassword">Lost password?</Link>
                  </p>
                </div>
                <button onClick={handleLogin}>Log In</button>
              </form>
              <div className="loginSignUpTabsContentLoginText">
                <p>
                  No account yet?{" "}
                  <span onClick={() => handleTab("tabButton2")}>Create Account</span>
                </p>
              </div>
            </div>
          )}

          {/* sign up */}
          {activeTab === "tabButton2" && (
            <div className="loginSignUpTabsContentRegister">
              <form>
                <input value={name} placeholder="User Name *" required onChange={(e) => setName(e.target.value)} />
                <input value={email} placeholder="Email address *" required onChange={(e) => setEmail(e.target.value)} />
                <input value={password} placeholder="Password *" required onChange={(e) => setPassword(e.target.value)} />
                <input value={address} placeholder="Living Address *" required onChange={(e) => setAddress(e.target.value)} />
                <input value={phoneNumber} placeholder="Phone Number" required onChange={(e) => setPhoneNumber(e.target.value)} />
                <p>
                  Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our
                  <Link to="/terms" style={{ textDecoration: "none", color: "#c32929" }}> privacy policy</Link>.
                </p>
                <button onClick={handleRegister}>Register</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
