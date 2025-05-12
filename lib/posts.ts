import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { Post } from "@/lib/types"

const postsDirectory = path.join(process.cwd(), "posts")

// Mock data for client-side rendering
const mockPosts: Post[] = [
  {
    title: "My Journey to Faith: A Personal Testimony",
    slug: "journey-to-faith",
    date: "2023-05-15",
    category: "Testimonials",
    featuredImage: "/placeholder.svg?height=600&width=800",
    excerpt: "How a skeptic found faith through unexpected encounters and experiences.",
    content: "Full content would go here...",
    keywords: ["faith", "testimony", "conversion", "spiritual journey"],
    sections: [
      {
        heading: "The Beginning",
        content: "Content for section 1...",
      },
      {
        heading: "The Turning Point",
        content: "Content for section 2...",
      },
      {
        heading: "New Perspectives",
        content: "Content for section 3...",
      },
    ],
  },
  {
    title: "Ancient Prayer Practices for Modern Life",
    slug: "ancient-prayer-practices",
    date: "2023-06-22",
    category: "Spiritual Guidance",
    featuredImage: "/placeholder.svg?height=600&width=800",
    excerpt: "Rediscovering timeless prayer techniques that can transform your spiritual life.",
    content: "Full content would go here...",
    keywords: ["prayer", "spiritual practices", "meditation", "ancient wisdom"],
    sections: [
      {
        heading: "Historical Context",
        content: "Content for section 1...",
      },
      {
        heading: "Key Practices",
        content: "Content for section 2...",
      },
      {
        heading: "Modern Applications",
        content: "Content for section 3...",
      },
    ],
  },
  // Additional mock posts...
]

// Client-safe functions that don't use Node.js APIs
export function getMockPosts(): Post[] {
  return mockPosts
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    // Check if the posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn("Posts directory does not exist. Returning mock data.")
      return getMockPosts()
    }

    // Get all category directories
    const categoryDirs = fs
      .readdirSync(postsDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    const allPosts: Post[] = []

    // Process each category directory
    for (const category of categoryDirs) {
      const categoryPath = path.join(postsDirectory, category)

      try {
        // Get all files in the category directory
        const dirContents = fs.readdirSync(categoryPath, { withFileTypes: true })

        // Process markdown files directly in the category folder
        const postFiles = dirContents
          .filter((dirent) => dirent.isFile() && (dirent.name.endsWith(".md") || dirent.name.endsWith(".mdx")))
          .map((dirent) => dirent.name)

        // Process each post file
        for (const filename of postFiles) {
          try {
            const filePath = path.join(categoryPath, filename)
            const post = await parseMarkdownFile(filePath)
            allPosts.push(post)
          } catch (error) {
            console.error(`Error processing post file ${filename}:`, error)
            // Continue with next file rather than failing the entire function
          }
        }

        // Process subcategory directories
        const subcategoryDirs = dirContents.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name)

        // Process each subcategory directory
        for (const subcategory of subcategoryDirs) {
          const subcategoryPath = path.join(categoryPath, subcategory)

          try {
            const subcategoryFiles = fs
              .readdirSync(subcategoryPath)
              .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))

            // Process each post file in the subcategory
            for (const filename of subcategoryFiles) {
              try {
                const filePath = path.join(subcategoryPath, filename)
                const post = await parseMarkdownFile(filePath)
                allPosts.push(post)
              } catch (error) {
                console.error(`Error processing post file ${filename} in subcategory ${subcategory}:`, error)
                // Continue with next file rather than failing
              }
            }
          } catch (error) {
            console.error(`Error reading subcategory ${subcategory}:`, error)
            // Continue with next subcategory rather than failing
          }
        }
      } catch (error) {
        console.error(`Error reading category ${category}:`, error)
        // Continue with next category rather than failing
      }
    }

    // Sort posts by date (newest first)
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error reading posts:", error)
    return getMockPosts()
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const allPosts = await getAllPosts()
  // Select the 5 most recent posts as featured, or fewer if there aren't 5 posts
  return allPosts.slice(0, Math.min(5, allPosts.length))
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.category.toLowerCase().replace(/\s+/g, "-") === category)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const allPosts = await getAllPosts()
  return allPosts.find((post) => post.slug === slug) || null
}

// Parse markdown file and extract frontmatter and content
export async function parseMarkdownFile(filePath: string): Promise<Post> {
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  // Process markdown content to HTML
  const processedContent = await remark().use(html).process(content)
  const htmlContent = processedContent.toString()

  // Extract sections based on H2 headings
  const sections = []
  const headingRegex = /## (.*?)\n([\s\S]*?)(?=## |$)/g
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    sections.push({
      heading: match[1].trim(),
      content: match[2].trim(),
    })
  }

  // Create excerpt from content if not provided in frontmatter
  const excerpt = data.excerpt || content.replace(/^#.*\n/, "").substring(0, 200) + "..."

  // Get category from the folder structure
  const categoryPath = path.relative(postsDirectory, filePath).split(path.sep)[0]
  const categoryName = categoryPath
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: data.title,
    slug: path.basename(filePath, path.extname(filePath)),
    date: data.date,
    category: data.category || categoryName, // Use frontmatter category or derive from folder
    featuredImage: data.featuredImage || "/placeholder.svg?height=600&width=800",
    excerpt: excerpt,
    content: htmlContent,
    keywords: data.keywords || [],
    sections,
  }
}

// Export types for use in other files
export type { Post }
