import { Blog } from "../hooks/useBlog";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">
          <div className="col-span-8  ">
            <div className="text-4xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              {new Date(blog.publishedDate).toLocaleDateString()}{" "}
              {new Date(blog.publishedDate).toLocaleTimeString()}
            </div>
            <div className="text-xl pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4 ">
            <div>Author</div>
            <div className="flex items-center">
              <div className="pr-4 ">
                <Avatar name={blog.author.firstName} size="big" />
              </div>
              <div>
                <div className="text-xl font-extrabold">
                  {blog.author.firstName + " " + blog.author.lastName ||
                    "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random Catch Phrase about Author's Ability to grab users'
                  Attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
