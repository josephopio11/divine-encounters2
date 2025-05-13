import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface FeaturedStoriesProps {
  posts: Post[];
}

export function FeaturedStories({ posts }: FeaturedStoriesProps) {
  // Take the first 5 posts for the featured section
  const featuredPosts = posts.slice(0, 6);
  const mainFeature = featuredPosts[0];
  const secondaryFeatures = featuredPosts.slice(1, 3);
  const tertiaryFeatures = featuredPosts.slice(3);

  if (!mainFeature) return null;

  return (
    <section className="py-8">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">
        Featured Stories
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 overflow-hidden md:col-span-2 my-0 py-0 aspect-video md:aspect-[16/10] hover:shadow-2xl hover:shadow-black/50 transition duration-300">
          <Link href={`/posts/${mainFeature.slug}`} className="group">
            <div className="relative aspect-[16/10] object-cover overflow-hidden">
              <Image
                src={
                  mainFeature.featuredImage ||
                  "/placeholder.svg?height=600&width=800"
                }
                alt={mainFeature.title}
                fill
                className="object-cover transition-all group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="mb-2">{mainFeature.category}</Badge>
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {mainFeature.title}
                </h3>
                <p className="mb-2 line-clamp-2 text-white/90">
                  {mainFeature.excerpt}
                </p>
                <p className="text-sm text-white/70">
                  {formatDate(mainFeature.date)}
                </p>
              </div>
            </div>
          </Link>
        </Card>
        <div className="grid grid-cols-1 gap-4">
          {secondaryFeatures.map((post) => (
            <Card
              key={post.slug}
              className="overflow-hidden my-0 py-0 hover:shadow-2xl hover:shadow-black/50 transition duration-300"
            >
              <Link href={`/posts/${post.slug}`} className="group h-full">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={
                      post.featuredImage ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-all group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Badge className="mb-2">{post.category}</Badge>
                    <h3 className="mb-1 text-lg font-bold text-white">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {formatDate(post.date)}
                    </p>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
        {tertiaryFeatures.map((post) => (
          <Card
            key={post.slug}
            className="overflow-hidden my-0 py-0 hover:shadow-2xl hover:shadow-black/50 transition duration-300"
          >
            <Link href={`/posts/${post.slug}`} className="group">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={
                    post.featuredImage ||
                    "/placeholder.svg?height=400&width=600"
                  }
                  alt={post.title}
                  fill
                  className="object-cover transition-all group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Badge className="mb-2">{post.category}</Badge>
                  <h3 className="mb-1 text-lg font-bold text-white">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/70">
                    {formatDate(post.date)}
                  </p>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
