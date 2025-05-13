import type { Post } from "@/lib/types";
import Link from "next/link";
import PostCard from "./post-card";

interface RecentStoriesProps {
  posts: Post[];
}

export function RecentStories({ posts }: RecentStoriesProps) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Recent Stories</h2>
        <Link
          href="/archive"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
