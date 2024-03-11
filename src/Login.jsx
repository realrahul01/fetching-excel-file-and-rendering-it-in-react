import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { logginHandler } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const errorHandler1 = () => {
    setTimeout(() => {
      setEmailError("");
    }, 2000);
  };
  const errorHandler2 = () => {
    setTimeout(() => {
      setPasswordError("");
    }, 2000);
  };

  const loginhandler = () => {
    let regexEmail = /^\S+@\S+\.\S+$/;
    if (!regexEmail.test(email)) {
      setEmailError("*Please enter a valid email");
      errorHandler1();
      return;
    }
    if (password.length < 8) {
      setPasswordError("*Password must be have 8 characters");
      errorHandler2();
      return;
    }
    let regexPassword1 = /.*[\W_].*/;
    if (!regexPassword1.test(password)) {
      setPasswordError("*Password must contains minimum one special symbol");
      errorHandler2();
      return;
    }

    let regexPassword2 = /^(?=.*\d)/;
    if (!regexPassword2.test(password)) {
      setPasswordError("*Password must contains minimum one numeric value");
      errorHandler2();
      return;
    }
    let regexPassword3 = /[A-Z]/;
    if (!regexPassword3.test(password)) {
      setPasswordError("*Password must contains atleast one upper character");
      errorHandler2();
      return;
    }
    let regexPassword4 = /^.*[a-zA-Z0-9][^a-zA-Z0-9]*$/;
    if (!regexPassword4.test(password)) {
      setPasswordError("*Password must contains atleast one character");
      errorHandler2();
      return;
    }
    localStorage.setItem('Login', true)
    logginHandler();
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <div className="cont-int">
          <label htmlFor="">Email</label>
          <div>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="errorSty">{emailError}</p>
        </div>
        <div className="cont-int">
          <label htmlFor="">Password</label>
          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="errorSty">{passwordError}</p>
        </div>
        <div className="cont-int">
          <button onClick={loginhandler}>Login</button>
        </div>
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button style={{ padding: "10px" }} onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </>
  );
};
export default Login;
