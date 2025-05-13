import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/lib/server/categories-server";
import { Search } from "lucide-react";

export async function SiteHeader() {
  const categories = await getAllCategories();

  console.log("Categories:", categories);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-2 md:px-4 mx-auto">
        <MainNav categories={categories} />
        <MobileNav categories={categories} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <nav className="flex items-center space-x-2">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
