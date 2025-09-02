import React from "react"
import type { Blog } from "../services"

interface CardProps {
  blog: Blog
}

function Card({ blog }: CardProps) {
  return (
    <div className="border-2 border-gray-300 rounded-md p-4 w-64 h-auto shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center space-y-3">
        <img
          src={blog.avatar}
          alt={blog.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
        />
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          {blog.name}
        </h2>
        <p className="text-sm text-gray-600 text-center">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <div className="text-xs text-gray-500">ID: {blog.id}</div>
      </div>
    </div>
  )
}

export default Card
