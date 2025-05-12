import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contributor Guidelines",
  description: "Guidelines for contributing content to Divine Encounters.",
}

export default function ContributorGuidelinesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Contributor Guidelines</h1>
          <p className="text-xl text-muted-foreground">
            Guidelines for writing and submitting content to Divine Encounters
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>About Divine Encounters</h2>
          <p>
            Divine Encounters is a platform dedicated to sharing stories of faith, spirituality, and divine experiences
            from around the world. We welcome contributions from writers of all backgrounds who have meaningful
            insights, experiences, or knowledge to share with our readers.
          </p>

          <h2>Content We're Looking For</h2>
          <p>We publish content in the following categories:</p>
          <ul>
            <li>
              <strong>Testimonials:</strong> Personal accounts of spiritual experiences, conversion stories, and
              miraculous events.
            </li>
            <li>
              <strong>Spiritual Guidance:</strong> Articles about prayer practices, meditation techniques, and scripture
              study.
            </li>
            <li>
              <strong>Faith Traditions:</strong> Explorations of different religious traditions and practices.
            </li>
            <li>
              <strong>Sacred Places:</strong> Articles about pilgrimage sites, holy lands, and sacred architecture.
            </li>
            <li>
              <strong>Community:</strong> Content related to interfaith dialogue, service opportunities, and spiritual
              events.
            </li>
            <li>
              <strong>Resources:</strong> Reviews of books, podcasts, and other media related to spirituality and faith.
            </li>
          </ul>

          <h2>Submission Guidelines</h2>
          <h3>Format</h3>
          <p>All submissions should be in Markdown format with the following frontmatter metadata:</p>
          <pre>
            {`---
title: "Your Article Title Here"
date: "YYYY-MM-DD"
category: "Category Name"
featuredImage: "/images/your-image-filename.jpg"
keywords: ["keyword1", "keyword2", "keyword3"]
---`}
          </pre>

          <h3>Length</h3>
          <p>
            Articles should be between 800-2,000 words. Longer pieces may be considered for special features or split
            into a series.
          </p>

          <h3>Structure</h3>
          <p>Your article should include:</p>
          <ul>
            <li>A compelling title</li>
            <li>A brief introduction that hooks the reader</li>
            <li>Well-organized body content with clear headings (use ## for H2 headings)</li>
            <li>A thoughtful conclusion</li>
          </ul>

          <h3>Style Guidelines</h3>
          <p>We value content that is:</p>
          <ul>
            <li>
              <strong>Authentic:</strong> Write from personal experience when possible.
            </li>
            <li>
              <strong>Respectful:</strong> Show respect for diverse perspectives and traditions.
            </li>
            <li>
              <strong>Accessible:</strong> Write in clear, engaging language that's accessible to a general audience.
            </li>
            <li>
              <strong>Well-researched:</strong> Include sources for factual claims when appropriate.
            </li>
            <li>
              <strong>Thoughtful:</strong> Offer meaningful insights rather than superficial observations.
            </li>
          </ul>

          <h2>Editorial Process</h2>
          <p>Here's what to expect after you submit your article:</p>
          <ol>
            <li>Initial review (1-2 weeks)</li>
            <li>If accepted, editorial feedback and revisions</li>
            <li>Final approval and scheduling</li>
            <li>Publication and promotion</li>
          </ol>

          <h2>Rights and Compensation</h2>
          <p>
            By submitting content to Divine Encounters, you grant us the right to publish your work on our website and
            promote it through our social media channels. You retain the copyright to your work and are free to
            republish it elsewhere after a 30-day exclusivity period.
          </p>
          <p>
            At this time, we are unable to offer monetary compensation for contributions. However, we do provide
            exposure to our growing audience and the opportunity to establish yourself as a voice in the spiritual
            writing community.
          </p>

          <h2>How to Submit</h2>
          <p>
            Please send your submissions to submissions@divineencounters.org with the subject line "Article Submission:
            [Your Title]". Include a brief bio (50-100 words) and any relevant social media handles or website links.
          </p>

          <h2>Questions?</h2>
          <p>
            If you have any questions about these guidelines or the submission process, please contact our editorial
            team at editor@divineencounters.org.
          </p>
        </div>
      </div>
    </main>
  )
}
