import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
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
      .catch((err) => {
        return err;
      });
  }, []);
  return { loading, blog };
};
