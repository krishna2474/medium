import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
interface Blogs {
  content: string;
  title: string;
  id: string;
  author: {
    firstName: string;
  };
  publishedDate: string;
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const nav = useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem("token"));

    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status == 403) {
          nav("/signin");
        }
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          nav("/signin"); // Navigate to signin if status is 403
        } else {
          console.error("Error fetching blogs:", error);
          // Handle other errors if needed
          setLoading(false);
        }
      });
  }, []);
  return { loading, blogs };
};
