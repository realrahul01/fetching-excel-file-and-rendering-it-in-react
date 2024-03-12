import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthContext";
import Test from "./Test";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Test />} /> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
