import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from "@/lib/types"

interface RelatedPostsProps {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mx-auto max-w-4xl py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">Related Articles</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
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
                <h3 className="mb-2 line-clamp-2 text-lg font-bold">{post.title}</h3>
                <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}
