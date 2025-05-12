"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Success!", {
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="border-t bg-muted/50">
      <div className="container px-4 py-12 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
              Stay updated with the latest stories, events, and insights from
              Divine Encounters.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md space-y-2">
            <form className="flex space-x-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="max-w-lg flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
