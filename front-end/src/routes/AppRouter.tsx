import About from "@/pages/About";
import Code from "@/pages/Code";
import Home from "@/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/code" element={<Code />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
