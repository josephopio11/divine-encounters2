"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.info("Message sent!", {
        description:
          "We&apos;ve received your message and will get back to you soon.",
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground">
            We&apos;d love to hear from you. Get in touch with the Divine
            Encounters team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="mt-1 h-5 w-5 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground">
                  contact@divineencounters.org
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="mt-1 h-5 w-5 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-muted-foreground">
                  123 Spiritual Way
                  <br />
                  Serenity Valley, CA 90210
                  <br />
                  United States
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject <span className="text-red-500">*</span>
              </label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
