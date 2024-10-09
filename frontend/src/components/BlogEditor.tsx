import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";

export const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="flex flex-col items-center w-full">
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        id="first_name"
        className="max-w-screen-lg bg-gray-100 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
        placeholder="Title"
        required
      />
      <textarea
        onChange={(e) => setContent(e.target.value)}
        id="message"
        rows={4}
        className="mt-4 max-w-screen-lg block p-2.5 w-full text-sm text-gray-900 bg-gray-100 resize-y rounded-lg focus:outline-none min-h-36 max-h-64"
        placeholder="Write your thoughts here..."
      ></textarea>
      <button
        type="submit"
        onClick={async () => {
          const res = await axios.post(
            `${BACKEND_URL}/api/v1/blog`,
            {
              title,
              content,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          alert(res.data);
        }}
        className="focus:ring-0 mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Publish post
      </button>
    </div>
  );
};
