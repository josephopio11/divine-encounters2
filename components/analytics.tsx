"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // This is where you would typically initialize and track page views
      // with services like Google Analytics, Plausible, etc.
      console.log(`Page view: ${pathname}${searchParams ? `?${searchParams}` : ""}`)
    }
  }, [pathname, searchParams])

  return null
}
