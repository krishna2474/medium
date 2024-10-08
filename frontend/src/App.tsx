import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
        <div className="flex justify-center pt-10">
          <Link to={"/signup"}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-none"
            >
              Sign up
            </button>
          </Link>
          <Link to={"/signin"}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-none"
            >
              Login
            </button>
          </Link>
        </div>
      </BrowserRouter>
    </>
  );
}
