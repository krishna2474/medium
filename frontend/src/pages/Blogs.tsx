import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import { SkeletonBlogCard } from "../components/SkeletonBlogCard";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div className="flex justify-center">
      <div className="max-w-xl">
        {loading ? (
          <div className="flex justify-center flex-col">
            <SkeletonBlogCard />
            <SkeletonBlogCard />
          </div>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.firstName}
              content={blog.content}
              title={blog.title}
              publishedDate={blog.publishedDate}
            />
          ))
        )}
      </div>
    </div>
  );
};
