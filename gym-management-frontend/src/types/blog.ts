// src/types/blog.ts
export interface BlogAuthor {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishDate: string;
  readTime: number;
  author?: BlogAuthor;
  category: BlogCategory;
  tags?: string[];
  featured?: boolean;
}

// src/types/contact.ts
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
}

export interface MapLocation {
  lat: number;
  lng: number;
  zoom: number;
}

export interface FAQ {
  question: string;
  answer: string;
}
