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
    // Kiểm tra các trường đầu vào
    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;  // Dừng lại nếu thiếu thông tin
    }
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Kiểm tra các trường đầu vào
    if (!name || !email || !password || !address || !phoneNumber) {
      toast.error("All fields are required!");
      return;  // Dừng lại nếu thiếu thông tin
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format!");
      return;
    }

    // Kiểm tra mật khẩu (ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt)
    const passwordRegex = /^[A-Za-z0-9]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters long and contain only letters and numbers.");
      return;
    }

    // Kiểm tra định dạng số điện thoại (ví dụ: 10 chữ số)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Invalid phone number format! Please enter a 10-digit number.");
      return;
    }

    // Gửi yêu cầu đăng ký
    dispatch(registerUser({ name, email, password, address, phoneNumber }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");  // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
    }
    if (error) {
      toast.error(error);  // Hiển thị thông báo lỗi khi có lỗi từ API
    }
    if (success) {
      toast.success("Registration successful! Please login.");
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
