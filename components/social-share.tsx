"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Link2, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  title: string;
  slug: string;
}

export function SocialShare({ title, slug }: SocialShareProps) {
  const baseUrl = "https://divineencounters.org";
  const url = `${baseUrl}/posts/${slug}`;

  const shareLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.info("Link copied!", {
        description: "The article link has been copied to your clipboard.",
      });
    });
  };

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold">Share this article</h3>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            onClick={() => window.open(link.url, "_blank")}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
            <span className="ml-2">{link.name}</span>
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          aria-label="Copy link"
        >
          <Link2 className="h-4 w-4" />
          <span className="ml-2">Copy Link</span>
        </Button>
      </div>
    </div>
  );
}
