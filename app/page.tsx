import { BreakingNewsTicker } from "@/components/breaking-news-ticker";
import { CategoryHighlights } from "@/components/category-highlights";
import { FeaturedStories } from "@/components/featured-stories";
import { RecentStories } from "@/components/recent-stories";
import { getAllCategories } from "@/lib/server/categories-server";
import { getAllPosts, getFeaturedPosts } from "@/lib/server/posts-server";
import { Post } from "@/lib/types";
import { PostTicker } from "@/lib/types-added";

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();
  const categories = await getAllCategories();

  // Get posts for each category
  const categoryPosts: Post[] = [];

  for (const category of categories) {
    const posts = allPosts
      .filter(
        (post) =>
          post.category.toLowerCase().replace(/\s+/g, "-") === category.slug
      )
      .slice(0, 4);

    categoryPosts[category.slug] = posts;
  }

  // get unique latest post for each category and return only title, slug and date
  const uniqueLatestPosts: PostTicker[] = [];

  for (const category of categories) {
    const latestPost = allPosts.find(
      (post) =>
        post.category.toLowerCase().replace(/\s+/g, "-") === category.slug
    );

    if (latestPost) {
      uniqueLatestPosts.push({
        title: latestPost.title,
        slug: latestPost.slug,
        date: latestPost.date,
      });
    }
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <BreakingNewsTicker posts={uniqueLatestPosts} />
      {featuredPosts.length > 0 ? (
        <FeaturedStories posts={featuredPosts} />
      ) : (
        <div className="py-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            Welcome to Divine Encounters
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our collection of stories about faith, spirituality, and
            divine experiences from around the world.
          </p>
        </div>
      )}

      {allPosts.length > 0 ? (
        <RecentStories posts={allPosts.slice(0, 8)} />
      ) : null}

      {categories.map((category) => {
        const posts = categoryPosts[category.slug] || [];
        // Only render category highlights if there are posts in this category
        return posts.length > 0 ? (
          <CategoryHighlights
            key={category.slug}
            category={category.slug}
            posts={posts}
          />
        ) : null;
      })}

      {allPosts.length === 0 && (
        <div className="my-12 py-8 text-center">
          <h3 className="text-xl font-semibold mb-4">No Posts Found</h3>
          <p className="text-muted-foreground">
            Start adding markdown files to the /posts directory to see them
            displayed here.
          </p>
        </div>
      )}
    </main>
  );
}
