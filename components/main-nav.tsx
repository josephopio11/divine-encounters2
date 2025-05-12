"use client";

import { MegaMenu } from "@/components/mega-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export function MainNav() {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );

  const categories = [
    {
      name: "Testimonials",
      slug: "testimonials",
      subcategories: [
        { name: "Personal Encounters", slug: "personal-encounters" },
        { name: "Conversion Stories", slug: "conversion-stories" },
        { name: "Miracle Accounts", slug: "miracle-accounts" },
      ],
    },
    {
      name: "Spiritual Guidance",
      slug: "spiritual-guidance",
      subcategories: [
        { name: "Prayer Practices", slug: "prayer-practices" },
        { name: "Meditation Techniques", slug: "meditation-techniques" },
        { name: "Scripture Study", slug: "scripture-study" },
      ],
    },
    {
      name: "Faith Traditions",
      slug: "faith-traditions",
      subcategories: [
        { name: "Christianity", slug: "christianity" },
        { name: "Islam", slug: "islam" },
      ],
    },
    {
      name: "Sacred Places",
      slug: "sacred-places",
      subcategories: [
        { name: "Pilgrimage Sites", slug: "pilgrimage-sites" },
        { name: "Holy Lands", slug: "holy-lands" },
        { name: "Sacred Architecture", slug: "sacred-architecture" },
      ],
    },
    {
      name: "Community",
      slug: "community",
      subcategories: [
        { name: "Events Calendar", slug: "events-calendar" },
        { name: "Interfaith Dialogue", slug: "interfaith-dialogue" },
        { name: "Service Opportunities", slug: "service-opportunities" },
      ],
    },
    {
      name: "Resources",
      slug: "resources",
      subcategories: [
        { name: "Book Reviews", slug: "book-reviews" },
        { name: "Podcasts & Media", slug: "podcasts-media" },
        { name: "Study Guides", slug: "study-guides" },
      ],
    },
  ];

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block text-xl">
          Divine Encounters
        </span>
      </Link>
      <nav className="flex flex-wrap items-center space-x-6 text-sm font-medium">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="relative"
            onMouseEnter={() => setActiveCategory(category.slug)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-1 px-2",
                pathname.startsWith(`/category/${category.slug}`) &&
                  "text-primary"
              )}
              asChild
            >
              <Link href={`/category/${category.slug}`}>
                {category.name}
                <ChevronDown className="h-4 w-4" />
              </Link>
            </Button>
            {activeCategory === category.slug && (
              <MegaMenu category={category} />
            )}
          </div>
        ))}
        <Button variant="ghost" className="px-2" asChild>
          <Link href="/about">About</Link>
        </Button>
        <Button variant="ghost" className="px-2" asChild>
          <Link href="/contact">Contact</Link>
        </Button>
      </nav>
    </div>
  );
}
