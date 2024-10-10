import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate?: string;
}

export const Avatar = ({
  name,
  size,
}: {
  name: string;
  size: "small" | "big";
}) => {
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    localStorage.removeItem("token");
    nav("/signin");
  };

  return (
    <div className="relative inline-block">
      <div
        className={`inline-flex items-center justify-center ${
          size === "small" ? "w-7 h-7" : "w-10 h-10"
        } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer`}
        onClick={toggleMenu} // Add click handler to toggle menu
      >
        <span
          className={`font-medium text-gray-600 dark:text-gray-300 ${
            size === "small" ? "text-xs" : "text-md"
          }`}
        >
          {name[0]}
        </span>
      </div>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 mr-2 w-32 bg-white rounded-md shadow-xl">
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  {
    return (
      <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-300 pb-4 pt-4 pl-4 pr-4">
          <div className="flex items-center">
            <div className="flex justify-center flex-col">
              <Avatar name={authorName} size="small" />
            </div>
            <div className="font-extralight px-2">{authorName}</div>
            <div className="font-thin text-slate-400">
              {typeof publishedDate === "string"
                ? publishedDate.slice(0, 10)
                : "UnKnown"}
            </div>
          </div>
          <div className="text-xl font-bold pt-2">{title}</div>
          <div className="text-md font-thin">
            {typeof content === "string" ? content.slice(0, 95) + "....." : ""}
          </div>
          <div className="text-slate-500 font-thin text-sm pt-4">
            {`${Math.ceil(content.length / 100)} Minute(s)`}
          </div>
        </div>
      </Link>
    );
  }
};
