import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { blogService, type Blog } from "../services/api"

function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setError(null)
      blogService
        .getBlogById(id)
        .then((blogData) => {
          setBlog(blogData)
          setLoading(false)
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Failed to fetch blog")
          setLoading(false)
        })
    }
  }, [id])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading blog...</div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">
            {error || "Blog not found"}
          </div>
          <Link
            to="/blogs"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Blogs
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <img
              src={blog.avatar}
              alt={blog.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {blog.name}
            </h1>
            <p className="text-lg text-gray-600">
              Created on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">ID: {blog.id}</p>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Blog Details
            </h2>
            <p className="text-gray-600">
              This is the detailed view for blog "{blog.name}". You can add more
              content here like blog description, author information, or any
              other blog-related data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
