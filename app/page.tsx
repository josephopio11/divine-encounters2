import { BreakingNewsTicker } from "@/components/breaking-news-ticker";
import { CategoryHighlights } from "@/components/category-highlights";
import { FeaturedStories } from "@/components/featured-stories";
import { RecentStories } from "@/components/recent-stories";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";

export default async function Home() {
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();

  // Get posts for each category
  const categories = [
    "testimonials",
    "spiritual-guidance",
    "faith-traditions",
    "sacred-places",
    "community",
    "resources",
  ];

  const categoryPosts = {};

  for (const category of categories) {
    categoryPosts[category] = allPosts
      .filter(
        (post) => post.category.toLowerCase().replace(/\s+/g, "-") === category
      )
      .slice(0, 4);
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <BreakingNewsTicker />
      <FeaturedStories posts={featuredPosts} />
      <RecentStories posts={allPosts.slice(0, 8)} />
      {categories.map((category) => (
        <CategoryHighlights
          key={category}
          category={category}
          posts={categoryPosts[category]}
        />
      ))}
    </main>
  );
}
