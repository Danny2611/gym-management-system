import React from "react";
import { Link } from "react-router-dom";
import { BlogPost, BlogCategory } from "../../../types/blog";

interface BlogSidebarProps {
  categories: BlogCategory[];
  recentPosts: BlogPost[];
  tags?: string[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  categories,
  recentPosts,
  tags = [],
}) => {
  return (
    <div className="space-y-8">
      {/* Search Box */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            className="focus:ring-primary-500 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2"
          />
          <button className="absolute right-3 top-3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/blog/category/${category.slug}`}
                className="hover:text-primary-500 flex items-center justify-between transition-colors"
              >
                <span>{category.name}</span>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                  {category.postCount}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id} className="flex space-x-3">
              <div className="h-16 w-16 flex-shrink-0">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full rounded object-cover"
                />
              </div>
              <div className="flex-1">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:text-primary-500 line-clamp-2 font-medium transition-colors"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500">{post.publishDate}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog/tag/${tag}`}
                className="hover:bg-primary-100 hover:text-primary-600 rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSidebar;
