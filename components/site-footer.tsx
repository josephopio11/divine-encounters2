import { getAllCategories } from "@/lib/server/categories-server";
import Link from "next/link";

export async function SiteFooter() {
  const categories = await getAllCategories();

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Divine Encounters</h3>
            <p className="text-sm text-muted-foreground">
              Stories of faith, spirituality, and divine experiences from around
              the world.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contributor-guidelines"
                  className="hover:underline"
                >
                  Contributor Guidelines
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://twitter.com/divineencounters"
                  className="hover:underline"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com/divineencounters"
                  className="hover:underline"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com/divineencounters"
                  className="hover:underline"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtube.com/divineencounters"
                  className="hover:underline"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Divine Encounters. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
