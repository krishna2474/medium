import { BlogEditor } from "../components/BlogEditor";

export const Publish = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10">
      <div className="text-xl font-bold">Publish a Blog</div>
      <BlogEditor />
    </div>
  );
};
