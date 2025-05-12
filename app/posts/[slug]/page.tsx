import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { formatDate, getReadingTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, Clock, Calendar, Tag } from "lucide-react"
import { SocialShare } from "@/components/social-share"
import { RelatedPosts } from "@/components/related-posts"
import { CommentSection } from "@/components/comment-section"

interface PostPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.date,
      authors: ["Divine Encounters"],
      images: [
        {
          url: post.featuredImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: [post.featuredImage || "/og-image.jpg"],
    },
  }
}

export default async function PostPage({ params, searchParams }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const currentPage = Number(searchParams.page) || 1
  const sections = post.sections || []
  const totalPages = sections.length || 1

  // Get current section based on page parameter
  const currentSection = sections[currentPage - 1] || { heading: "", content: post.content }

  // Get all posts for related posts
  const allPosts = await getAllPosts()
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.category === post.category || p.keywords.some((keyword) => post.keywords.includes(keyword))),
    )
    .slice(0, 3)

  return (
    <main className="container mx-auto px-4 py-12">
      <article className="mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href={`/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
              {post.category}
            </Link>
            {currentPage > 1 && (
              <>
                <span>/</span>
                <span>Page {currentPage}</span>
              </>
            )}
          </div>

          {currentPage === 1 && (
            <>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {getReadingTime(post.content)} min read
                </div>
                <div className="flex items-center">
                  <Tag className="mr-1 h-4 w-4" />
                  {post.keywords.slice(0, 3).join(", ")}
                </div>
              </div>
              <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
                <Image
                  src={post.featuredImage || "/placeholder.svg?height=600&width=1200"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </>
          )}

          {currentPage > 1 && <h2 className="text-3xl font-bold tracking-tight">{currentSection.heading}</h2>}
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {currentPage === 1 && !sections.length ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: currentSection.content }} />
          )}
        </div>

        <SocialShare title={post.title} slug={post.slug} />

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between">
            <Button variant="outline" disabled={currentPage <= 1} asChild={currentPage > 1}>
              {currentPage > 1 ? (
                <Link href={`/posts/${post.slug}${currentPage > 2 ? `?page=${currentPage - 1}` : ""}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Link>
              ) : (
                <span>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </span>
              )}
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <Button variant="outline" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
              {currentPage < totalPages ? (
                <Link href={`/posts/${post.slug}?page=${currentPage + 1}`}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <span>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        )}
      </article>

      <Separator className="my-12" />

      <RelatedPosts posts={relatedPosts} />

      <CommentSection postSlug={post.slug} />
    </main>
  )
}
