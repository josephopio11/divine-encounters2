"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { CategoryData } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MegaMenuProps {
  category: CategoryData;
}

export function MegaMenu({ category }: MegaMenuProps) {
  // Use client-side state for featured posts
  console.log("Rendering mega menu for category:", category.name);

  const [featuredPosts, setFeaturedPosts] = useState([
    {
      title: `Featured in ${category.name}: Article Title 1`,
      slug: "article-slug-1",
      featuredImage: "/placeholder.svg?height=200&width=300",
      excerpt:
        "A brief excerpt from this featured article that gives readers a taste of the content.",
    },
    {
      title: `Featured in ${category.name}: Article Title 2`,
      slug: "article-slug-2",
      featuredImage: "/placeholder.svg?height=200&width=300",
      excerpt:
        "Another brief excerpt from this featured article that gives readers a taste of the content.",
    },
  ]);

  console.log("Featured posts:", featuredPosts);

  return (
    <div className=" left-0 top-full z-50 mt-1 relative">
      <Card className="border shadow-lg absolute left-0 top-full mt-1 w-screen max-w-screen-xl">
        What is this
        <CardContent className="grid grid-cols-4 gap-6 p-6">
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold">{category.name}</h3>
            <ul className="space-y-2">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.slug}>
                  <Link
                    href={`/category/${category.slug}/${subcategory.slug}`}
                    className="text-sm hover:underline"
                  >
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                href={`/category/${category.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                View All {category.name}
              </Link>
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <div key={post.slug} className="flex flex-col space-y-2">
                <Link href={`/posts/${post.slug}`}>
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src={post.featuredImage || "/placeholder.svg"}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="aspect-[3/2] h-auto w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                </Link>
                <Link href={`/posts/${post.slug}`}>
                  <h4 className="font-semibold hover:underline">
                    {post.title}
                  </h4>
                </Link>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
