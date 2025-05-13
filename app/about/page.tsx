import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Divine Encounters and our mission to share stories of faith and spirituality.",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            About Divine Encounters
          </h1>
          <p className="text-xl text-muted-foreground">
            Sharing stories of faith, spirituality, and divine experiences from
            around the world.
          </p>
        </div>

        <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Divine Encounters Team"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>Our Mission</h2>
          <p>
            Divine Encounters was founded with a simple yet profound mission: to
            create a space where people from all walks of life and faith
            traditions can share their spiritual experiences and insights. We
            believe that these personal stories have the power to inspire,
            comfort, and transform.
          </p>

          <h2>Our Vision</h2>
          <p>
            We envision a world where spiritual experiences are respected and
            valued as an important dimension of human life. By collecting and
            sharing these stories, we hope to foster greater understanding and
            appreciation for the diverse ways in which people experience the
            divine.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Respect:</strong> We honor the diversity of spiritual
              experiences and religious traditions.
            </li>
            <li>
              <strong>Authenticity:</strong> We value genuine, heartfelt sharing
              of personal experiences.
            </li>
            <li>
              <strong>Inclusivity:</strong> We welcome contributions from people
              of all faiths and backgrounds.
            </li>
            <li>
              <strong>Integrity:</strong> We are committed to ethical journalism
              and respectful dialogue.
            </li>
            <li>
              <strong>Curiosity:</strong> We approach different perspectives
              with openness and a desire to learn.
            </li>
          </ul>

          <h2>Our Team</h2>
          <p>
            Divine Encounters is made possible by a dedicated team of writers,
            editors, and spiritual seekers who are passionate about creating a
            platform for meaningful spiritual dialogue. Our contributors come
            from diverse religious backgrounds and bring a wealth of
            perspectives to our publication.
          </p>

          <h2>Join Us</h2>
          <p>
            We invite you to be part of our community. Whether you have a story
            to share, want to contribute as a writer, or simply wish to engage
            with our content, there&apos;s a place for you at Divine Encounters.
            Together, we can explore the rich tapestry of human spiritual
            experience and deepen our understanding of the sacred dimensions of
            life.
          </p>
        </div>
      </div>
    </main>
  );
}
