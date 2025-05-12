import type { CategoryData } from "@/lib/types"

// Default categories for client-side rendering
const defaultCategories: CategoryData[] = [
  {
    name: "Testimonials",
    slug: "testimonials",
    description: "Explore our collection of articles about testimonials.",
    subcategories: [
      { name: "Personal Encounters", slug: "personal-encounters", description: "Articles about personal encounters" },
      { name: "Conversion Stories", slug: "conversion-stories", description: "Articles about conversion stories" },
      { name: "Miracle Accounts", slug: "miracle-accounts", description: "Articles about miracle accounts" },
    ],
    postCount: 0,
  },
  {
    name: "Spiritual Guidance",
    slug: "spiritual-guidance",
    description: "Explore our collection of articles about spiritual guidance.",
    subcategories: [
      { name: "Prayer Practices", slug: "prayer-practices", description: "Articles about prayer practices" },
      {
        name: "Meditation Techniques",
        slug: "meditation-techniques",
        description: "Articles about meditation techniques",
      },
      { name: "Scripture Study", slug: "scripture-study", description: "Articles about scripture study" },
    ],
    postCount: 0,
  },
  {
    name: "Faith Traditions",
    slug: "faith-traditions",
    description: "Explore our collection of articles about faith traditions.",
    subcategories: [
      { name: "Christianity", slug: "christianity", description: "Articles about Christianity" },
      { name: "Islam", slug: "islam", description: "Articles about Islam" },
    ],
    postCount: 0,
  },
  {
    name: "Sacred Places",
    slug: "sacred-places",
    description: "Explore our collection of articles about sacred places.",
    subcategories: [
      { name: "Pilgrimage Sites", slug: "pilgrimage-sites", description: "Articles about pilgrimage sites" },
      { name: "Holy Lands", slug: "holy-lands", description: "Articles about holy lands" },
      { name: "Sacred Architecture", slug: "sacred-architecture", description: "Articles about sacred architecture" },
    ],
    postCount: 0,
  },
  {
    name: "Community",
    slug: "community",
    description: "Explore our collection of articles about community.",
    subcategories: [
      { name: "Events Calendar", slug: "events-calendar", description: "Articles about events calendar" },
      { name: "Interfaith Dialogue", slug: "interfaith-dialogue", description: "Articles about interfaith dialogue" },
      {
        name: "Service Opportunities",
        slug: "service-opportunities",
        description: "Articles about service opportunities",
      },
    ],
    postCount: 0,
  },
  {
    name: "Resources",
    slug: "resources",
    description: "Explore our collection of articles about resources.",
    subcategories: [
      { name: "Book Reviews", slug: "book-reviews", description: "Articles about book reviews" },
      { name: "Podcasts & Media", slug: "podcasts-media", description: "Articles about podcasts and media" },
      { name: "Study Guides", slug: "study-guides", description: "Articles about study guides" },
    ],
    postCount: 0,
  },
]

// Client-safe functions that don't use Node.js APIs
export function getDefaultCategories(): CategoryData[] {
  return defaultCategories
}

// Export types for use in other files
export type { CategoryData }
