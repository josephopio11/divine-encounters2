import { Post } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface PostItemProps {
  post: Post;
  flagged?: boolean;
}

const FeaturedCard = ({ post, flagged }: PostItemProps) => {
  return (
    <Card
      key={post.slug}
      className="overflow-hidden my-0 py-0 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300"
    >
      <Link href={`/posts/${post.slug}`} className="group h-full">
        <div className="relative h-full overflow-hidden">
          <Image
            src={post.featuredImage || "/placeholder.svg?height=400&width=600"}
            alt={post.title}
            width={620}
            height={620}
            className={cn(
              "object-cover h-full aspect-video transition-all duration-300 group-hover:scale-105",
              flagged && "aspect-[16/10]"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Badge className="mb-2">{post.category}</Badge>
            <h3 className="mb-1 text-lg font-bold text-white">{post.title}</h3>
            <p className="text-sm text-white/70">{formatDate(post.date)}</p>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default FeaturedCard;
