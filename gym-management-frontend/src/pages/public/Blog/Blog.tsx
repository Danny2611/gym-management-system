// src/pages/Blog.tsx
import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import BlogHeader from "../../../components/sections/blog/BlogHeader";
// import BlogGrid from '../../components/sections/blog/BlogGrid';
import BlogSidebar from "../../../components/sections/blog/BlogSidebar";
import BlogPagination from "../../../components/sections/blog/BlogPagination";
import NewsletterSignup from "../../../components/common/NewsletterSignup";
import { BlogPost, BlogCategory } from "../../../types/blog";
import HomeSlider from "../../../components/sections/home/HomeSlider";
import BlogFeaturedSection from "../../../components/sections/blog/BlogFeaturedSection";

// Mock data - replace with API calls
const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "10 Essential Exercises for Building Core Strength",
    slug: "10-essential-exercises-for-building-core-strength",
    excerpt:
      "Discover the key exercises that can transform your core strength and improve overall fitness.",
    content: "<p>Detailed content about core exercises...</p>",
    coverImage: "/images/blog/post1.jpg",
    publishDate: "2023-05-15",
    readTime: 8,
    category: { id: "1", name: "Workouts", slug: "workouts", postCount: 12 },
    tags: ["core-strength", "fitness", "workouts"],
    author: {
      id: "1",
      name: "John Fitness",
      bio: "Certified personal trainer with 10+ years of experience",
      avatar: "/images/team/trainer1.jpg",
    },
  },
  // Add more mock posts...
];

const MOCK_CATEGORIES: BlogCategory[] = [
  { id: "1", name: "Workouts", slug: "workouts", postCount: 12 },
  { id: "2", name: "Nutrition", slug: "nutrition", postCount: 8 },
  { id: "3", name: "Wellness", slug: "wellness", postCount: 5 },
  { id: "4", name: "Success Stories", slug: "success-stories", postCount: 4 },
  { id: "5", name: "Gym News", slug: "gym-news", postCount: 3 },
];

const MOCK_TAGS = [
  "fitness",
  "nutrition",
  "strength",
  "cardio",
  "wellness",
  "yoga",
  "crossfit",
  "weight-loss",
];

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API calls
    setPosts(MOCK_POSTS);
    setCategories(MOCK_CATEGORIES);
    setRecentPosts(MOCK_POSTS.slice(0, 4));
    setTags(MOCK_TAGS);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, you'd fetch posts for the new page here
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <HomeSlider />
      <BlogHeader title="Our Blog" />
      <BlogFeaturedSection />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Main content */}
          <div className="lg:w-2/3">
            {/* <BlogGrid posts={posts} /> */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <BlogSidebar
              categories={categories}
              recentPosts={recentPosts}
              tags={tags}
            />
          </div>
        </div>
      </div>

      <NewsletterSignup
        title="Stay Updated"
        subtitle="Subscribe to our newsletter for the latest fitness tips and gym news"
      />
    </Layout>
  );
};

export default Blog;
