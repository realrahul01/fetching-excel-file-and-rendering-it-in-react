import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const navigate = useNavigate();

  const { isLogin,logginOutHandler } = useContext(AuthContext);

  const logouthandler=()=>{
    localStorage.setItem('Login', false)
    logginOutHandler()
    navigate('/login')
  }

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="left-nav">
          <h1>Splendornet</h1>
        </div>
        <div className="right-nav">
          {isLogin && <button onClick={logouthandler}>Logout</button>}
          {!isLogin && <button onClick={loginHandler}>Login</button>}
        </div>
      </nav>
    </>
  );
};

export default Header;
