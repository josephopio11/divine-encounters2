"use client";

import { Button } from "@/components/ui/button";
import type { CategoryData } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

interface MainNavProps {
  categories: CategoryData[];
}

export function MainNav({ categories }: MainNavProps) {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex  items-center space-x-2">
        <span className="hidden font-bold sm:inline-block text-xl">
          Divine Encounters
        </span>
      </Link>
      <nav className="flex flex-wrap justify-center items-center space-x-6 text-sm font-medium">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="relative"
            onMouseEnter={() => setActiveCategory(category.slug)}
            // onMouseLeave={() => setActiveCategory(null)}
            onMouseDown={() => setActiveCategory(null)}
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
                {/* <ChevronDown className="h-4 w-4" /> */}
              </Link>
            </Button>
            {/* {activeCategory === category.slug && (
              <MegaMenu category={category} />
            )} */}
          </div>
        ))}
        {/* <Button variant="ghost" className="px-2" asChild>
          <Link href="/about">About</Link>
        </Button>
        <Button variant="ghost" className="px-2" asChild>
          <Link href="/contact">Contact</Link>
        </Button> */}
      </nav>
    </div>
  );
}
