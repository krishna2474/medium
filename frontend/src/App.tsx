import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Signup } from "./pages/Signup";
import { AppBar } from "./components/AppBar";
import { Publish } from "./pages/Publish";
import { Landing } from "./pages/Landing";
import { useEffect } from "react";
export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace 'token' with your actual token key
    if (token) {
      navigate("/blogs"); // Redirect to /blogs if token exists
    } else {
      navigate("/"); // Redirect to / if token does not exist
    }
  }, [navigate]);
  return (
    <>
      <AppBar />
      <Routes>
        <Route path={"/"} element={<Landing />}></Route>
        <Route path={"/signup"} element={<Signup />}></Route>
        <Route path={"/signin"} element={<Signin />}></Route>
        <Route path={"/blogs"} element={<Blogs />}></Route>
        <Route path={"/blog/:id"} element={<Blog />}></Route>
        <Route path={"/publish"} element={<Publish />}></Route>
      </Routes>
    </>
  );
}
