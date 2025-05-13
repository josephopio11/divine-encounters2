import type { Post } from "@/lib/types";
import Link from "next/link";
import PostCard from "./post-card";

interface CategoryHighlightsProps {
  category: string;
  posts: Post[];
}

export function CategoryHighlights({
  category,
  posts,
}: CategoryHighlightsProps) {
  if (!posts || posts.length === 0) return null;

  // Format category name for display
  const displayName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">{displayName}</h2>
        <Link
          href={`/category/${category}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
          // <Card
          //   key={post.slug}
          //   className="overflow-hidden mt-0 pt-0 hover:shadow-2xl hover:shadow-black/50 transition duration-300"
          // >
          //   <Link href={`/posts/${post.slug}`} className="group">
          //     <div className="relative aspect-[16/9] overflow-hidden">
          //       <Image
          //         src={
          //           post.featuredImage ||
          //           "/placeholder.svg?height=300&width=500"
          //         }
          //         alt={post.title}
          //         fill
          //         className="object-cover transition-all group-hover:scale-105"
          //       />
          //     </div>
          //     <CardContent className="p-4">
          //       <h3 className="mb-2 line-clamp-2 text-lg font-bold">
          //         {post.title}
          //       </h3>
          //       <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          //         {post.excerpt}
          //       </p>
          //       <p className="text-xs text-muted-foreground">
          //         {formatDate(post.date)}
          //       </p>
          //     </CardContent>
          //   </Link>
          // </Card>
        ))}
      </div>
    </section>
  );
}
