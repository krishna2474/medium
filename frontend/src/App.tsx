import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Signup } from "./pages/Signup";
import { AppBar } from "./components/AppBar";
import { Publish } from "./pages/Publish";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={"/signin"} element={<Signin />}></Route>
          <Route path={"/blogs"} element={<Blogs />}></Route>
          <Route path={"/blog/:id"} element={<Blog />}></Route>
          <Route path={"/publish"} element={<Publish />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
