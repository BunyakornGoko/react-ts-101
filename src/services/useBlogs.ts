import { useState, useEffect } from "react"
import { blogService, type Blog } from "./api"

export interface UseBlogsReturn {
  blogs: Blog[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useBlogs = (): UseBlogsReturn => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await blogService.getAllBlogs()
      setBlogs(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching blogs"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs
  }
}

export interface UseBlogByIdReturn {
  blog: Blog | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useBlogById = (id: string): UseBlogByIdReturn => {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlog = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await blogService.getBlogById(id)
      setBlog(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching the blog"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchBlog()
    }
  }, [id])

  return {
    blog,
    loading,
    error,
    refetch: fetchBlog
  }
}
