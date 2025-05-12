import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ArchivePageProps {
  searchParams: {
    page?: string
  }
}

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse all articles from Divine Encounters.",
}

export default async function ArchivePage({ searchParams }: ArchivePageProps) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 12

  const posts = await getAllPosts()
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Archive</h1>
        <p className="text-xl text-muted-foreground">Browse all articles from Divine Encounters.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedPosts.map((post) => (
          <Card key={post.slug} className="overflow-hidden">
            <Link href={`/posts/${post.slug}`} className="group">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.featuredImage || "/placeholder.svg?height=300&width=500"}
                  alt={post.title}
                  fill
                  className="object-cover transition-all group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">{post.category}</Badge>
                <h2 className="mb-2 line-clamp-2 text-xl font-bold">{post.title}</h2>
                <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center space-x-2">
          <Button variant="outline" size="icon" disabled={currentPage <= 1} asChild={currentPage > 1}>
            {currentPage > 1 ? (
              <Link href={`/archive?page=${currentPage - 1}`}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Link>
            ) : (
              <span>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </span>
            )}
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" size="icon" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
            {currentPage < totalPages ? (
              <Link href={`/archive?page=${currentPage + 1}`}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Link>
            ) : (
              <span>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </span>
            )}
          </Button>
        </div>
      )}
    </main>
  )
}
