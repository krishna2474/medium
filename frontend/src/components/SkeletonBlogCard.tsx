import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonBlogCard = () => {
  return (
    <div className="border-b border-slate-300 pb-4 pt-4">
      <div className="flex  space-x-4">
        {/* Avatar skeleton */}
        <div>
          <Skeleton circle={true} height={40} width={40} />
        </div>
        {/* Text skeleton (name and date) */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Skeleton width={80} height={20} />
            <Skeleton width={60} height={15} />
          </div>
          {/* Blog Title */}
          <div className="mb-2">
            <Skeleton width={150} height={25} />
          </div>
          {/* Blog Content */}
          <div className="mb-2">
            <Skeleton count={2} />
          </div>
          {/* Blog Read Time */}
          <Skeleton width={60} height={15} />
        </div>
      </div>
    </div>
  );
};
