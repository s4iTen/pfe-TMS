import React from "react";
import { useSelector } from "react-redux";
import house1 from "../../assets/house1.png";
import house2 from "../../assets/house2.png";

const posts = [
  {
    id: 1,
    title: "How to Find the Perfect Rental Property",
    image: house1,
    summary:
      "Discover the key steps to finding the perfect rental property, including location analysis, budget planning, and more.",
    date: "October 8, 2024",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Top 5 Investment Opportunities",
    image: house2,
    summary:
      "Learn about the top 5 investment opportunities in the real estate market and how to take advantage of them.",
    date: "October 5, 2024",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Tips for First-Time Renters",
    image: house1,
    summary:
      "Navigating the rental market for the first time? Here are some tips to help you secure the best deal on your new home.",
    date: "September 30, 2024",
    author: "Michael Brown",
  },
  {
    id: 4,
    title: "How to Find the Perfect Rental Property",
    image: house2,
    summary:
      "Discover the key steps to finding the perfect rental property, including location analysis, budget planning, and more.",
    date: "October 8, 2024",
    author: "John Doe",
  },
  {
    id: 5,
    title: "Top 5 Investment Opportunities",
    image: house1,
    summary:
      "Learn about the top 5 investment opportunities in the real estate market and how to take advantage of them.",
    date: "October 5, 2024",
    author: "Jane Smith",
  },
  {
    id: 6,
    title: "Tips for First-Time Renters",
    image: house2,
    summary:
      "Navigating the rental market for the first time? Here are some tips to help you secure the best deal on your new home.",
    date: "September 30, 2024",
    author: "Michael Brown",
  },
];

const Post = ({ post }) => {
  const darkMode = useSelector((state) => state.global.mode);

  return (
    <div
      key={post.id}
      className={`rounded-lg shadow-lg overflow-hidden ${
        darkMode === "dark" ? "bg-[#333] text-white" : "bg-white text-gray-800"
      }`}
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3
          className={`text-xl font-bold mb-2 ${
            darkMode === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`mb-4 ${
            darkMode === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {post.summary}
        </p>
        <p
          className={`text-sm mb-4 ${
            darkMode === "dark" ? "text-gray-400" : "text-gray-400"
          }`}
        >{`By ${post.author} • ${post.date}`}</p>
        <button
          className={`mt-auto px-4 py-2 rounded-lg transition duration-300 ${
            darkMode === "dark"
              ? "bg-blue-400 hover:bg-blue-500 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

const Blog = () => {
  const darkMode = useSelector((state) => state.global.mode);

  return (
    <section
      className={`py-12 ${darkMode === "dark" ? "bg-[#444]" : "bg-[#F2F2F2]"}`}
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            darkMode === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Our Blog
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
