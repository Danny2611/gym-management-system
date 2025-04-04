import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import SectionTitle from "../../../common/SectionTitle";

interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  comments: number;
  category: string;
}

const blogPosts: BlogPostProps[] = [
  {
    id: "strength-training-beginners",
    title: "Strength Training Tips for Beginners",
    excerpt:
      "Starting a strength training routine can be intimidating. Here are the essential tips to help you begin your journey safely and effectively.",
    image: "/images/blog/blog-1.jpg",
    date: "March 15, 2023",
    author: "John Davis",
    comments: 8,
    category: "Training",
  },
  {
    id: "nutrition-myths",
    title: "Common Nutrition Myths Debunked",
    excerpt:
      "With so much nutrition information available, it's hard to separate fact from fiction. Let's explore common myths and the science behind them.",
    image: "/images/blog/blog-2.jpg",
    date: "February 28, 2023",
    author: "Emma Wilson",
    comments: 12,
    category: "Nutrition",
  },
  {
    id: "cardio-workout-benefits",
    title: "The Surprising Benefits of HIIT Workouts",
    excerpt:
      "High-Intensity Interval Training (HIIT) offers numerous advantages beyond just calorie burning. Discover why this workout style is so effective.",
    image: "/images/blog/blog-3.jpg",
    date: "January 20, 2023",
    author: "Mike Johnson",
    comments: 5,
    category: "Cardio",
  },
];

const BlogPreviewSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Latest Articles"
          subtitle="OUR BLOG"
          description="Stay updated with the latest health, fitness, and nutrition tips from our expert trainers and coaches."
          centered
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/blog/${post.id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-60 w-full object-cover"
                />
              </Link>
              <div className="p-6">
                <div className="mb-3 flex items-center text-sm text-gray-500">
                  <FiCalendar className="mr-2" /> {post.date}
                  <span className="mx-2">|</span>
                  <FiUser className="mr-2" /> {post.author}
                  <span className="mx-2">|</span>
                  <FiMessageSquare className="mr-2" /> {post.comments} Comments
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#0D2E4B]">
                  <Link
                    to={`/blog/${post.id}`}
                    className="transition-colors hover:text-[#0CC6F0]"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mb-4 text-gray-600">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center font-medium text-[#0CC6F0] hover:underline"
                >
                  Read More <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
