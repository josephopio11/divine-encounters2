import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryBySlug } from "@/lib/server/categories-server";
import { getPostsByCategory } from "@/lib/server/posts-server";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const pageParams = await params;
  const category = await getCategoryBySlug(pageParams.category);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const pageParams = await params;
  const mySearchParams = await searchParams;

  const category = await getCategoryBySlug(pageParams.category);

  if (!category) {
    notFound();
  }

  const currentPage = Number(mySearchParams.page) || 1;
  const postsPerPage = 12;

  const posts = await getPostsByCategory(pageParams.category);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>
      </div>

      {category.subcategories.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Subcategories</h2>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((subcategory) => (
              <Button key={subcategory.slug} variant="outline" asChild>
                <Link href={`/category/${category.slug}/${subcategory.slug}`}>
                  {subcategory.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}

      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedPosts.map((post) => (
            <Card
              key={post.slug}
              className="overflow-hidden hover:shadow-2xl hover:shadow-black/20 pt-0 mt-0 transition duration-300 ease-in-out"
            >
              <Link href={`/posts/${post.slug}`} className="group mt-0 pt-0">
                <div className="relative aspect-[16/9] overflow-hidden mt-0 pt-0">
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
            No posts found in this category yet.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add markdown files to the /{category.slug} directory to see them
            displayed here.
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
              <Link href={`/category/${category.slug}?page=${currentPage - 1}`}>
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
              <Link href={`/category/${category.slug}?page=${currentPage + 1}`}>
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
