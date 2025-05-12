"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface CommentSectionProps {
  postSlug: string;
}

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
  avatar?: string;
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      content:
        "This article was very insightful. I particularly enjoyed the section about prayer practices.",
      date: "2023-05-20T12:00:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      content:
        "Thank you for sharing this perspective. It's given me a lot to think about in my own spiritual journey.",
      date: "2023-05-21T14:30:00Z",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        name,
        email,
        content: comment,
        date: new Date().toISOString(),
      };

      setComments([newComment, ...comments]);
      setName("");
      setEmail("");
      setComment("");
      setIsSubmitting(false);

      toast.success("Comment submitted!", {
        description: "Your comment has been posted successfully.",
      });
    }, 1000);
  };

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <section className="mx-auto max-w-4xl py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <h3 className="text-lg font-semibold">Leave a comment</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="comment" className="text-sm font-medium">
            Comment <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Post Comment"}
        </Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-lg border p-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{comment.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {formatCommentDate(comment.date)}
                  </p>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
