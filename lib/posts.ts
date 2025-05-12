import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { Post } from "@/lib/types"

const postsDirectory = path.join(process.cwd(), "posts")

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
      const postFiles = fs.readdirSync(categoryPath).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))

      // Process each post file
      for (const filename of postFiles) {
        const filePath = path.join(categoryPath, filename)
        const post = await parseMarkdownFile(filePath)
        allPosts.push(post)
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
  // In a real implementation, you might have a "featured" flag in your frontmatter
  // For now, we'll just return the first few posts
  return allPosts.slice(0, 5)
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

  return {
    title: data.title,
    slug: path.basename(filePath, path.extname(filePath)),
    date: data.date,
    category: data.category,
    featuredImage: data.featuredImage,
    excerpt: data.excerpt || content.substring(0, 200) + "...",
    content: htmlContent,
    keywords: data.keywords || [],
    sections,
  }
}

// Fallback mock posts if file system operations fail
function getMockPosts(): Post[] {
  return [
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
}
