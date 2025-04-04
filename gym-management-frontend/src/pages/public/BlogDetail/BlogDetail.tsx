import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import BlogDetailSection from "../../../components/sections/blog/BlogDetail";
import BlogSidebar from "../../../components/sections/blog/BlogSidebar";
import NewsletterSignup from "../../../components/common/NewsletterSignup";
import { BlogPost, BlogCategory } from "../../../types/blog";

// Mock data - replace with API calls
const MOCK_POST: BlogPost = {
  id: "1",
  title: "10 Essential Exercises for Building Core Strength",
  slug: "10-essential-exercises-for-building-core-strength",
  excerpt:
    "Discover the key exercises that can transform your core strength and improve overall fitness.",
  content: `
    <p>Strong core muscles are essential for almost every physical activity we do. They support our spine, help with balance, and make everyday movements easier.</p>
    <h2>Why Core Strength Matters</h2>
    <p>A strong core does more than just give you visible abs. It improves your posture, prevents back pain, and enhances athletic performance.</p>
    <p>Here are the 10 best exercises to strengthen your core:</p>
    <h3>1. Plank</h3>
    <p>The plank is a foundational core exercise that engages multiple muscle groups at once.</p>
    <ul>
      <li>Start in a push-up position but with your weight on your forearms</li>
      <li>Keep your body in a straight line from head to heels</li>
      <li>Hold for 30-60 seconds</li>
      <li>Repeat 3 times</li>
    </ul>
    <h3>2. Dead Bug</h3>
    <p>This exercise is excellent for core stability and coordination.</p>
    <p>Continue with remaining exercises...</p>
  `,
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
};

const MOCK_RELATED_POSTS: BlogPost[] = [
  // Add 3 related post examples here
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

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    // In a real application, you would fetch the post based on the slug
    // This is just for demonstration
    setPost(MOCK_POST);
    setRelatedPosts(MOCK_RELATED_POSTS);
    setCategories(MOCK_CATEGORIES);
    setRecentPosts([MOCK_POST]); // Using the same post as recent for demo
    setTags(MOCK_TAGS);
  }, [slug]);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Loading post...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Main content */}
          <div className="lg:w-2/3">
            <BlogDetailSection post={post} relatedPosts={relatedPosts} />
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

export default BlogDetail;
