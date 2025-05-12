import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/types"

interface RecentStoriesProps {
  posts: Post[]
}

export function RecentStories({ posts }: RecentStoriesProps) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Recent Stories</h2>
        <Link href="/archive" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <Badge className="mb-2">{post.category}</Badge>
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
