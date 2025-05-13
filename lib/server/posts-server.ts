import type { Post } from "@/lib/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getAllPosts(): Promise<Post[]> {
  try {
    // Check if the posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn("Posts directory does not exist. Returning mock data.");
      return getMockPosts();
    }

    const allPosts: Post[] = [];

    // Recursive function to find all markdown files in a directory and its subdirectories
    const findMarkdownFiles = (dir: string) => {
      try {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        // Process files in this directory
        const markdownFiles = items.filter(
          (item) =>
            item.isFile() &&
            (item.name.endsWith(".md") || item.name.endsWith(".mdx"))
        );

        for (const file of markdownFiles) {
          try {
            const filePath = path.join(dir, file.name);
            const post = parseMarkdownFile(filePath);
            allPosts.push(post);
          } catch (error) {
            console.error(
              `Error processing markdown file ${file.name} in ${dir}:`,
              error
            );
          }
        }

        // Process subdirectories
        const directories = items.filter((item) => item.isDirectory());
        for (const subdir of directories) {
          findMarkdownFiles(path.join(dir, subdir.name));
        }
      } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
      }
    };

    // Start the recursive search from the posts directory
    findMarkdownFiles(postsDirectory);

    console.log(`Found ${allPosts.length} posts in total`);

    // Sort posts by date (newest first)
    return allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading posts:", error);
    return getMockPosts();
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const allPosts = await getAllPosts();
  // Select the 5 most recent posts as featured, or fewer if there aren't 5 posts
  return allPosts.slice(0, Math.min(6, allPosts.length));
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase().replace(/\s+/g, "-") === category
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // First try to find the post in the already processed posts
    const allPosts = await getAllPosts();
    const post = allPosts.find((post) => post.slug === slug);

    if (post) {
      return post;
    }

    // If not found, try to find the file directly (this is a fallback)
    // This is a more intensive search that looks for the specific file
    const findFileBySlug = (dir: string): string | null => {
      try {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        // Check files in this directory
        for (const item of items) {
          if (
            item.isFile() &&
            (item.name.endsWith(".md") || item.name.endsWith(".mdx")) &&
            path.basename(item.name, path.extname(item.name)) === slug
          ) {
            return path.join(dir, item.name);
          }
        }

        // Check subdirectories
        for (const item of items) {
          if (item.isDirectory()) {
            const found = findFileBySlug(path.join(dir, item.name));
            if (found) return found;
          }
        }

        return null;
      } catch (error) {
        console.error(`Error searching for file by slug in ${dir}:`, error);
        return null;
      }
    };

    const filePath = findFileBySlug(postsDirectory);
    if (filePath) {
      return parseMarkdownFile(filePath);
    }

    return null;
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

// Parse markdown file and extract frontmatter and content
function parseMarkdownFile(filePath: string): Post {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Process markdown content to HTML
    const processedContent = remark().use(html).processSync(content);
    const htmlContent = processedContent.toString();

    // Extract sections based on H2 headings
    const sections = [];
    const headingRegex = /## (.*?)\n([\s\S]*?)(?=## |$)/g;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      // Process the section content to HTML as well
      const sectionContentHtml = remark()
        .use(html)
        .processSync(match[2].trim())
        .toString();

      sections.push({
        heading: match[1].trim(),
        content: sectionContentHtml,
      });
    }

    // Create excerpt from content if not provided in frontmatter
    const excerpt =
      data.excerpt || content.replace(/^#.*\n/, "").substring(0, 200) + "...";

    // Get category from the folder structure or frontmatter
    const categoryFromFrontmatter = data.category;

    // If no category in frontmatter, derive from folder structure
    let categoryFromPath = "";
    if (!categoryFromFrontmatter) {
      const relativePath = path.relative(postsDirectory, filePath);
      const pathParts = relativePath.split(path.sep);
      if (pathParts.length > 0) {
        categoryFromPath = pathParts[0]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
    }

    // Get the slug from the filename
    const slug = path.basename(filePath, path.extname(filePath));

    return {
      title: data.title || "Untitled Post",
      slug: slug,
      date: data.date || new Date().toISOString(),
      category: categoryFromFrontmatter || categoryFromPath || "Uncategorized",
      featuredImage:
        data.featuredImage || "/placeholder.svg?height=600&width=800",
      excerpt: excerpt,
      content: htmlContent,
      keywords: data.keywords || [],
      sections,
    };
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error);
    throw error;
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
      excerpt:
        "How a skeptic found faith through unexpected encounters and experiences.",
      content: "<p>Full content would go here...</p>",
      keywords: ["faith", "testimony", "conversion", "spiritual journey"],
      sections: [
        {
          heading: "The Beginning",
          content: "<p>Content for section 1...</p>",
        },
        {
          heading: "The Turning Point",
          content: "<p>Content for section 2...</p>",
        },
        {
          heading: "New Perspectives",
          content: "<p>Content for section 3...</p>",
        },
      ],
    },
    {
      title: "Ancient Prayer Practices for Modern Life",
      slug: "ancient-prayer-practices",
      date: "2023-06-22",
      category: "Spiritual Guidance",
      featuredImage: "/placeholder.svg?height=600&width=800",
      excerpt:
        "Rediscovering timeless prayer techniques that can transform your spiritual life.",
      content: "<p>Full content would go here...</p>",
      keywords: [
        "prayer",
        "spiritual practices",
        "meditation",
        "ancient wisdom",
      ],
      sections: [
        {
          heading: "Historical Context",
          content: "<p>Content for section 1...</p>",
        },
        {
          heading: "Key Practices",
          content: "<p>Content for section 2...</p>",
        },
        {
          heading: "Modern Applications",
          content: "<p>Content for section 3...</p>",
        },
      ],
    },
    // Additional mock posts...
  ];
}
