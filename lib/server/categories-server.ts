"use server";

import { getDefaultCategories } from "@/lib/categories";
import type { CategoryData, SubCategoryData } from "@/lib/types";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");

/**
 * Get all categories and subcategories from the posts directory structure
 */
export async function getAllCategories(): Promise<CategoryData[]> {
  try {
    // Check if the posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn(
        "Posts directory does not exist. Returning default categories."
      );
      return getDefaultCategories();
    }

    // Get all category directories (top-level folders in /posts)
    const categoryDirs = fs
      .readdirSync(postsDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    const categories: CategoryData[] = [];

    // Process each category directory
    for (const categoryDir of categoryDirs) {
      const categoryPath = path.join(postsDirectory, categoryDir);

      // Format the category name for display (convert from slug to title case)
      const categoryName = categoryDir
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Get subcategories (subfolders within the category folder)
      let subcategories: SubCategoryData[] = [];
      try {
        subcategories = fs
          .readdirSync(categoryPath, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => {
            const subcategoryName = dirent.name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return {
              name: subcategoryName,
              slug: dirent.name,
              description: `Articles about ${subcategoryName.toLowerCase()}`,
            };
          });
      } catch (error) {
        console.error(`Error reading subcategories for ${categoryDir}:`, error);
        // Continue with empty subcategories rather than failing
      }

      // Count the number of posts in this category (markdown files in the category folder)
      let postCount = 0;
      try {
        postCount = fs
          .readdirSync(categoryPath)
          .filter(
            (file) => file.endsWith(".md") || file.endsWith(".mdx")
          ).length;
      } catch (error) {
        console.error(`Error counting posts for ${categoryDir}:`, error);
        // Continue with zero post count rather than failing
      }

      categories.push({
        name: categoryName,
        slug: categoryDir,
        description: `Explore our collection of articles about ${categoryName.toLowerCase()}.`,
        subcategories,
        postCount,
      });
    }

    return categories;
  } catch (error) {
    console.error("Error reading categories:", error);
    return getDefaultCategories();
  }
}

/**
 * Get a specific category by slug with its subcategories
 */
export async function getCategoryBySlug(
  slug: string
): Promise<CategoryData | null> {
  const categories = await getAllCategories();
  return categories.find((category) => category.slug === slug) || null;
}

/**
 * Get a specific subcategory by parent category slug and subcategory slug
 */
export async function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): Promise<{
  category: CategoryData;
  subcategory: CategoryData["subcategories"][0];
} | null> {
  const category = await getCategoryBySlug(categorySlug);

  if (!category) return null;

  const subcategory = category.subcategories.find(
    (sub) => sub.slug === subcategorySlug
  );

  if (!subcategory) return null;

  return { category, subcategory };
}
