import { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface PostItemProps {
  post: Post;
}

const PostCard = ({ post }: PostItemProps) => {
  return (
    <Card
      key={post.slug}
      className="overflow-hidden mt-0 pt-0 hover:shadow-2xl hover:shadow-black/50 transition duration-300"
    >
      <Link href={`/posts/${post.slug}`} className="group">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.featuredImage || "/placeholder.svg?height=300&width=500"}
            alt={post.title}
            width={400}
            height={400}
            className="object-cover transition-all w-full group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <Badge className="mb-2">{post.category}</Badge>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold">{post.title}</h3>
          <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDate(post.date)}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PostCard;
