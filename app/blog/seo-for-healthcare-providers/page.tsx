import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("seo-for-healthcare-providers")!;

export const metadata: Metadata = pageMeta({
  title: meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
});

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        Healthcare SEO has a higher bar than ordinary service SEO. Patients are not only looking for a provider. They are looking for evidence that the provider is qualified, nearby, trustworthy, and safe to contact.
      </P>
      <P>
        That means healthcare pages need to rank, but they also need to build confidence before the appointment request.
      </P>

      <H2>The trust layer comes first</H2>
      <P>
        Google treats health content as high-stakes. Thin pages, anonymous advice, unsupported claims, and vague service descriptions are weak signals. A clinic website should make expertise visible.
      </P>
      <UL>
        <LI>Doctor names, credentials, and specialties</LI>
        <LI>Clinic address, operating hours, and contact options</LI>
        <LI>Clear service descriptions written for patients</LI>
        <LI>Reviews and testimonials where allowed</LI>
        <LI>Medical disclaimers where advice is educational</LI>
        <LI>Schema for medical business, physicians, services, FAQs, and articles</LI>
      </UL>

      <H2>Pages every clinic should consider</H2>
      <H3>Service pages</H3>
      <P>
        Each important treatment, specialty, or service should have its own page. A dental clinic should not rely on one page for implants, braces, whitening, root canals, and emergency dentistry.
      </P>

      <H3>Location pages</H3>
      <P>
        If patients search by city, area, or "near me", location pages matter. Include directions, parking, nearby landmarks, accepted insurance if relevant, and FAQs specific to that location.
      </P>

      <H3>Doctor profile pages</H3>
      <P>
        Doctor pages strengthen E-E-A-T. Include credentials, experience, languages spoken, specialties, professional memberships, and appointment options.
      </P>

      <H2>Content that patients actually search for</H2>
      <UL>
        <LI>Symptoms that indicate when to see a professional</LI>
        <LI>Treatment options and what to expect</LI>
        <LI>Cost ranges and insurance questions where appropriate</LI>
        <LI>Recovery timelines</LI>
        <LI>Procedure preparation checklists</LI>
        <LI>Comparisons between treatment options</LI>
      </UL>
      <P>
        The content should be helpful without pretending to diagnose the reader. The goal is to educate, reduce uncertainty, and guide the patient toward an appointment when professional care is needed.
      </P>

      <H2>Local SEO for healthcare providers</H2>
      <P>
        A strong Google Business Profile can drive a large share of clinic enquiries. Keep categories accurate, add services, upload real clinic photos, respond to reviews, post updates, and make calling or booking easy.
      </P>
      <P>
        Consistency matters. The clinic name, address, phone number, hours, and website URL should match across directories, maps, booking platforms, and social profiles.
      </P>

      <Callout tone="lilac">
        Healthcare SEO is not won by the clinic that publishes the most blogs. It is won by the clinic that answers patient intent with the clearest proof of expertise and access.
      </Callout>

      <H2>AI search and healthcare</H2>
      <P>
        Patients increasingly ask AI assistants what symptoms mean, which specialist to see, and how to compare providers. Your content needs clear definitions, careful language, and visible credentials so AI systems can understand the source.
      </P>
      <P>
        Avoid exaggerated claims. Use precise service explanations, author attribution, medical review notes where appropriate, and FAQs that answer patient questions directly.
      </P>

      <H2>A 90-day healthcare SEO plan</H2>
      <UL>
        <LI><Strong>Weeks 1 to 2:</Strong> fix technical SEO, audit local listings, map services, and identify pages that should exist.</LI>
        <LI><Strong>Weeks 3 to 5:</Strong> build core service, location, and doctor profile pages.</LI>
        <LI><Strong>Weeks 6 to 8:</Strong> publish patient education content linked to the relevant service pages.</LI>
        <LI><Strong>Weeks 9 to 12:</Strong> improve ranking pages, add FAQ schema, build citations, and strengthen review generation.</LI>
      </UL>

      <H2>Where Rankday fits</H2>
      <P>
        Rankday builds fast, search-ready websites for clinics and healthcare providers, then optimises them for Google rankings and AI visibility. Start with <A href="/seo-for-clinics">SEO for clinics</A> if healthcare is your market.
      </P>
    </BlogPostLayout>
  );
}
