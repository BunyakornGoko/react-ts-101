import axios from "axios"

// Base API configuration
const API_BASE_URL = "https://6898a797ddf05523e55f7ac1.mockapi.io"

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

// TypeScript interfaces for the blog data
export interface Blog {
  id: string
  name: string
  avatar: string
  createdAt: string
}

export interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
}

// Blog service functions
export const blogService = {
  // Get all blogs
  async getAllBlogs(): Promise<Blog[]> {
    try {
      const response = await apiClient.get<Blog[]>("/blogs/Blogs")
      return response.data
    } catch (error) {
      console.error("Error fetching blogs:", error)
      throw error
    }
  },

  // Get a single blog by ID
  async getBlogById(id: string): Promise<Blog> {
    try {
      const response = await apiClient.get<Blog>(`/blogs/Blogs/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching blog with ID ${id}:`, error)
      throw error
    }
  },

  // Create a new blog
  async createBlog(blogData: Omit<Blog, "id" | "createdAt">): Promise<Blog> {
    try {
      const response = await apiClient.post<Blog>("/blogs/Blogs", blogData)
      return response.data
    } catch (error) {
      console.error("Error creating blog:", error)
      throw error
    }
  },

  // Update an existing blog
  async updateBlog(
    id: string,
    blogData: Partial<Omit<Blog, "id" | "createdAt">>
  ): Promise<Blog> {
    try {
      const response = await apiClient.put<Blog>(`/blogs/Blogs/${id}`, blogData)
      return response.data
    } catch (error) {
      console.error(`Error updating blog with ID ${id}:`, error)
      throw error
    }
  },

  // Delete a blog
  async deleteBlog(id: string): Promise<void> {
    try {
      await apiClient.delete(`/blogs/Blogs/${id}`)
    } catch (error) {
      console.error(`Error deleting blog with ID ${id}:`, error)
      throw error
    }
  }
}

// Export the axios instance for custom requests if needed
export { apiClient }

// Export default for convenience
export default blogService
