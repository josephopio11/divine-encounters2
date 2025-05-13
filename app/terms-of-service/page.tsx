import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Divine Encounters website.",
};

export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: May 12, 2023
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>Introduction</h2>
          <p>
            Welcome to Divine Encounters. These terms and conditions outline the
            rules and regulations for the use of our website.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and
            conditions in full. Do not continue to use Divine Encounters if you
            do not accept all of the terms and conditions stated on this page.
          </p>

          <h2>License</h2>
          <p>
            Unless otherwise stated, Divine Encounters and/or its licensors own
            the intellectual property rights for all material on Divine
            Encounters. All intellectual property rights are reserved. You may
            view and/or print pages from divineencounters.org for your own
            personal use subject to restrictions set in these terms and
            conditions.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from divineencounters.org</li>
            <li>
              Sell, rent or sub-license material from divineencounters.org
            </li>
            <li>
              Reproduce, duplicate or copy material from divineencounters.org
            </li>
            <li>
              Redistribute content from Divine Encounters (unless content is
              specifically made for redistribution)
            </li>
          </ul>

          <h2>User Comments</h2>
          <p>
            Certain parts of this website offer the opportunity for users to
            post and exchange opinions, information, material and data
            (&apos;Comments&apos;) in areas of the website. Divine Encounters
            does not screen, edit, publish or review Comments prior to their
            appearance on the website and Comments do not reflect the views or
            opinions of Divine Encounters, its agents or affiliates. Comments
            reflect the view and opinion of the person who posts such view or
            opinion.
          </p>
          <p>You are responsible for:</p>
          <ul>
            <li>
              Ensuring that any Comments you post comply with these Terms and
              Conditions
            </li>
            <li>
              Ensuring that any Comments you post do not infringe any
              third-party legal rights
            </li>
            <li>
              The accuracy, appropriateness and relevance of any Comments you
              post
            </li>
          </ul>

          <h2>Content Liability</h2>
          <p>
            We shall have no responsibility or liability for any content
            appearing on your website. You agree to indemnify and defend us
            against all claims arising out of or based upon your website. No
            link(s) may appear on any page on your website or within any context
            containing content or materials that may be interpreted as libelous,
            obscene or criminal, or which infringes, otherwise violates, or
            advocates the infringement or other violation of, any third party
            rights.
          </p>

          <h2>Reservation of Rights</h2>
          <p>
            We reserve the right at any time and in its sole discretion to
            request that you remove all links or any particular link to our
            website. You agree to immediately remove all links to our website
            upon such request. We also reserve the right to amend these terms
            and conditions and its linking policy at any time. By continuing to
            link to our website, you agree to be bound to and abide by these
            linking terms and conditions.
          </p>

          <h2>Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties and conditions relating to our website
            and the use of this website (including, without limitation, any
            warranties implied by law in respect of satisfactory quality,
            fitness for purpose and/or the use of reasonable care and skill).
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <p>
            Email: terms@divineencounters.org
            <br />
            Phone: +1 (555) 123-4567
            <br />
            Address: 123 Spiritual Way, Serenity Valley, CA 90210, United States
          </p>
        </div>
      </div>
    </main>
  );
}
