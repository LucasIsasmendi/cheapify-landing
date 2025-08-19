import React from 'react';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
  readTime: string;
  slug: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "Cheap Vegan Meal Ideas for Busy UK Shoppers",
    excerpt: "Looking for cheap vegan meal ideas in the UK? Discover 10 budget-friendly plant-based recipes and save money with Cheapify’s smart price comparison.",
    date: "August 18, 2025",
    author: "Emma Rodriguez",
    image: "/blog_images/Cheap Vegan Meal Ideas for Busy Shoppers.jpg",
    category: "time-saving",
    readTime: "5 min read",
    slug: "cheap-vegan-meal-ideas-for-busy-uk-shoppers"
  },
  {
    title: "Cheap Meatless Recipes That Taste Like a Treat",
    excerpt: "Make meat-free meals for under £2 per serving. Cheapify.app finds the lowest prices so your cheap meatless recipes taste like a treat every time.",
    date: "August 11, 2024",
    author: "Michael Chen",
    image: "/blog_images/vegan grocery items in bags with robot for price match.jpg",
    category: "under £2",
    readTime: "4 min read",
    slug: "cheap-meatless-recipes-that-taste-like-a-treat"
  },
  {
    title: "Low Cost Vegan Recipes That Make Your Grocery List Go Further",
    excerpt: "Discover low cost vegan recipes that stretch your grocery budget. Healthy, delicious meals for under £2 per serving—made easy with Cheapify.app.",
    date: "August 11, 2024",
    author: "Emma Rodriguez",
    image: "/blog_images/low cost vegan recipes x5.jpg",
    category: "low cost",
    readTime: "6 min read",
    slug: "low-cost-vegan-recipes"
  }
];

const BlogCard: React.FC<BlogPost> = ({ title, excerpt, date, author, image, category, readTime, slug }) => (
  <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <div className="flex items-center gap-4 mb-3">
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          {category}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          {readTime}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <User className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-500">{author}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </div>
      <a 
        href={`/blog/${slug}`}
        className="mt-4 inline-flex items-center text-green-600 hover:text-green-700 font-medium"
      >
        Read More
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  </article>
);

const Blog: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Latest from Our Blog</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover tips, recipes, and strategies for saving money on your vegan lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/blog"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            View All Posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;