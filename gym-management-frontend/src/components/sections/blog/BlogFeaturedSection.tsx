import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionTitle from "../../common/SectionTitle";
import { FaCalendarAlt, FaUserAlt, FaComments } from "react-icons/fa";

// Define interfaces for blog data
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  commentCount: number;
  featured: boolean;
}

const BlogFeaturedSection: React.FC = () => {
  // Mock data for featured blog posts
  const featuredPosts: BlogPost[] = [
    {
      id: 1,
      title: "How to Maximize Your HIIT Workout Results",
      excerpt:
        "Learn the top strategies to get the most out of your high-intensity interval training sessions.",
      slug: "maximize-hiit-workout-results",
      image: "/images/blog/featured-1.jpg",
      date: "March 2, 2025",
      author: {
        name: "Sarah Johnson",
        avatar: "/images/team/coach-1.jpg",
      },
      category: "Workouts",
      commentCount: 12,
      featured: true,
    },
    {
      id: 2,
      title: "Nutrition Tips for Muscle Building and Recovery",
      excerpt:
        "Discover the essential nutrients and meal timing strategies to support muscle growth and repair.",
      slug: "nutrition-tips-muscle-building",
      image: "/images/blog/featured-2.jpg",
      date: "February 28, 2025",
      author: {
        name: "Michael Torres",
        avatar: "/images/team/coach-2.jpg",
      },
      category: "Nutrition",
      commentCount: 8,
      featured: true,
    },
    {
      id: 3,
      title: "The Benefits of Morning Workouts vs. Evening Sessions",
      excerpt:
        "We analyze the pros and cons of exercising at different times of day to help you find your optimal schedule.",
      slug: "morning-vs-evening-workouts",
      image: "/images/blog/featured-3.jpg",
      date: "February 24, 2025",
      author: {
        name: "Jessica Lee",
        avatar: "/images/team/coach-3.jpg",
      },
      category: "Fitness Tips",
      commentCount: 15,
      featured: true,
    },
  ];

  const mainPost = featuredPosts[0];
  const secondaryPosts = featuredPosts.slice(1);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Featured Articles"
          subtitle="Latest Fitness Insights & Tips"
          alignment="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Featured Post */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-lg bg-white shadow-lg lg:col-span-2"
          >
            <div className="relative h-96 overflow-hidden">
              <img
                src={mainPost.image}
                alt={mainPost.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                {mainPost.category}
              </div>
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>{mainPost.date}</span>
                </div>
                <div className="flex items-center">
                  <FaUserAlt className="mr-1" />
                  <span>{mainPost.author.name}</span>
                </div>
                <div className="flex items-center">
                  <FaComments className="mr-1" />
                  <span>{mainPost.commentCount} Comments</span>
                </div>
              </div>

              <h3 className="mb-3 text-2xl font-bold text-gray-800 transition duration-300 hover:text-red-600">
                <Link to={`/blog/${mainPost.slug}`}>{mainPost.title}</Link>
              </h3>

              <p className="mb-4 text-gray-600">{mainPost.excerpt}</p>

              <Link
                to={`/blog/${mainPost.slug}`}
                className="inline-block font-semibold text-red-600 hover:underline"
              >
                Read More →
              </Link>
            </div>
          </motion.div>

          {/* Secondary Posts */}
          <div className="space-y-8 lg:col-span-1">
            {secondaryPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg sm:flex-row lg:flex-col"
              >
                <div className="h-48 overflow-hidden sm:w-2/5 lg:w-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-4 sm:w-3/5 lg:w-full">
                  <div className="mb-2 flex items-center space-x-2 text-xs text-gray-500">
                    <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">
                      {post.category}
                    </span>
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1" size={10} />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-800 transition duration-300 hover:text-red-600">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-block text-sm font-semibold text-red-600 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-block rounded-full border-2 border-red-600 px-8 py-3 font-semibold text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogFeaturedSection;
