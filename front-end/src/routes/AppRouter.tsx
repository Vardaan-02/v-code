import About from "@/pages/About";
import CodeArea from "@/pages/Code";
import Home from "@/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/code" element={<CodeArea />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
