import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    firstName: string;
    lastName: string;
  };
  publishedDate: string;
}
export const useBlog = ({ id }: { id: string }) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>({
    content: "",
    title: "",
    id: "",
    author: {
      firstName: "",
      lastName: "",
    },
    publishedDate: "",
  });
  useEffect(() => {
    console.log(localStorage.getItem("token"));

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
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
  return { loading, blog };
};
