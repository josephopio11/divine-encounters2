"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // This is where you would typically initialize and track page views
      // with services like Google Analytics, Plausible, etc.
      console.log(
        `Page view: ${pathname}${searchParams ? `?${searchParams}` : ""}`
      );
      // console.log(`Page view: ${pathname}`);
    }
  }, [pathname, searchParams]);

  return null;
}
