import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSubcategoryBySlug } from "@/lib/server/categories-server";
import { getAllPosts } from "@/lib/server/posts-server";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const pageParams = await params;
  const result = await getSubcategoryBySlug(
    pageParams.category,
    pageParams.subcategory
  );

  if (!result) {
    return {
      title: "Subcategory Not Found",
    };
  }

  const { category, subcategory } = result;

  return {
    title: `${subcategory.name} - ${category.name}`,
    description: subcategory.description,
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: SubcategoryPageProps) {
  const pageParams = await params;
  const mySearchParams = await searchParams;

  const result = await getSubcategoryBySlug(
    pageParams.category,
    pageParams.subcategory
  );

  if (!result) {
    notFound();
  }

  const { category, subcategory } = result;
  const currentPage = Number(mySearchParams.page) || 1;
  const postsPerPage = 12;

  // Get all posts and filter by category and subcategory
  // In a real implementation, you would have a more efficient way to get posts by subcategory
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) => {
    // Check if the post belongs to this category
    if (post.category.toLowerCase().replace(/\s+/g, "-") !== category.slug) {
      return false;
    }

    // Check if the post has keywords that match the subcategory
    // This is a simple heuristic - in a real implementation you might have a more explicit way to tag posts with subcategories
    const subcategoryWords = subcategory.slug.split("-");
    return subcategoryWords.some((word) =>
      post.keywords.some((keyword) => keyword.toLowerCase().includes(word))
    );
  });

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href={`/category/${category.slug}`} className="hover:underline">
            {category.name}
          </Link>
          <span>/</span>
          <span>{subcategory.name}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          {subcategory.name}
        </h1>
        <p className="text-xl text-muted-foreground">
          {subcategory.description}
        </p>
      </div>

      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden">
              <Link href={`/posts/${post.slug}`} className="group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={
                      post.featuredImage ||
                      "/placeholder.svg?height=300&width=500"
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2">{post.category}</Badge>
                  <h2 className="mb-2 line-clamp-2 text-xl font-bold">
                    {post.title}
                  </h2>
                  <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="my-12 text-center">
          <p className="text-lg text-muted-foreground">
            No posts found in this subcategory yet.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add markdown files to the /{category.slug}/{subcategory.slug}{" "}
            directory to see them displayed here.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage <= 1}
            asChild={currentPage > 1}
          >
            {currentPage > 1 ? (
              <Link
                href={`/category/${category.slug}/${subcategory.slug}?page=${
                  currentPage - 1
                }`}
              >
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
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage >= totalPages}
            asChild={currentPage < totalPages}
          >
            {currentPage < totalPages ? (
              <Link
                href={`/category/${category.slug}/${subcategory.slug}?page=${
                  currentPage + 1
                }`}
              >
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
  );
}
