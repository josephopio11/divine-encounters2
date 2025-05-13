export interface Post {
  title: string;
  slug: string;
  date: string;
  category: string;
  featuredImage?: string;
  excerpt?: string;
  content: string;
  keywords: string[];
  sections?: {
    heading: string;
    content: string;
  }[];
}

export interface CategoryData {
  name: string;
  slug: string;
  description: string;
  subcategories: {
    name: string;
    slug: string;
    description: string;
  }[];
  postCount?: number;
}
export interface SubCategoryData {
  name: string;
  slug: string;
  description: string;
  postCount?: number;
}
