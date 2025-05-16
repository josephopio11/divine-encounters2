"use client";

import { PostTicker } from "@/lib/types-added";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface LatestProps {
  posts: PostTicker[];
}

export function BreakingNewsTicker({ posts }: LatestProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [breakingNews, setBreakingNews] = useState<PostTicker[]>(posts);

  // Mock breaking news items
  // const breakingNews = [
  //   {
  //     id: 1,
  //     title: "New pilgrimage site discovered in remote mountains",
  //     link: "/posts/new-pilgrimage-site",
  //   },
  //   {
  //     id: 2,
  //     title: "Interfaith conference announces global prayer initiative",
  //     link: "/posts/interfaith-conference",
  //   },
  //   {
  //     id: 3,
  //     title: "Ancient religious manuscript restored after centuries",
  //     link: "/posts/ancient-manuscript-restored",
  //   },
  // ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % breakingNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [breakingNews.length]);

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 mb-6 rounded-md flex items-center overflow-hidden">
      <div className="font-bold mr-4 whitespace-nowrap">Hot Picks</div>
      <div className="relative h-6 flex-1 overflow-hidden">
        {breakingNews.map((item, index) => (
          <a
            key={item.slug}
            href={`/posts/${item.slug}`}
            className={cn(
              "absolute inset-0 flex items-center transition-transform duration-500 ease-in-out",
              index === activeIndex ? "translate-x-0" : "translate-x-full"
            )}
          >
            <ChevronRight className="mr-2 h-4 w-4" />
            <span className="whitespace-nowrap">{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
