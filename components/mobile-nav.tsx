"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

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
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open Menu">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col pr-0 sm:max-w-sm">
        <Link href="/" className="flex items-center space-x-2 px-6 py-4" onClick={() => setOpen(false)}>
          <span className="font-bold">Divine Encounters</span>
        </Link>
        <div className="flex-1 overflow-auto py-2">
          <Accordion type="multiple" className="w-full">
            {categories.map((category) => (
              <AccordionItem key={category.slug} value={category.slug}>
                <AccordionTrigger className="px-6 text-sm">{category.name}</AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="flex flex-col space-y-2 px-6 py-2">
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-sm font-medium hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      All {category.name}
                    </Link>
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.slug}
                        href={`/category/${category.slug}/${subcategory.slug}`}
                        className="text-sm hover:underline"
                        onClick={() => setOpen(false)}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex flex-col space-y-3 px-6 py-4">
            <Link href="/about" className="text-sm font-medium hover:underline" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
