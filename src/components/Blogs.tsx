import Card from "./Card"
import { useBlogs } from "../services"
import Search from "./Search"

function Blogs() {
  const { blogs, loading, error, refetch } = useBlogs()

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading blogs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
          <Search />
          <button
            onClick={refetch}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} blog={blog} />
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center text-gray-500 mt-8">No blogs found</div>
        )}
      </div>
    </div>
  )
}

export default Blogs
