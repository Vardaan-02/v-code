import About from "@/pages/About";
import Code from "@/pages/Code";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Register";
import ResetPasswordPage from "@/pages/ResetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/code" element={<Code />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
