import type { Metadata } from "next";
import { BlogPostLayout, P, H2, H3, UL, LI, Strong, Callout, A } from "@/components/blog-post-layout";
import { getPost } from "../posts";

const meta = getPost("eeat-explained-why-google-trusts-sites")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function Post() {
  return (
    <BlogPostLayout meta={meta}>
      <P>
        E-E-A-T stands for Experience, Expertise, Authoritativeness, Trustworthiness. It is the framework Google uses to decide which sites to surface for queries that affect health, finance, legal matters, and other high-stakes topics. Sites that demonstrate strong E-E-A-T outrank competitors even when the competitor's content is technically better optimised.
      </P>
      <P>
        Here is what each component actually requires and how to build the signals on your site.
      </P>

      <H2>The four components</H2>

      <H3>Experience</H3>
      <P>
        Added by Google in 2022 (it used to be just E-A-T). Experience signals that the content creator has firsthand knowledge of the subject. Not just researched knowledge. Lived knowledge.
      </P>
      <P>
        Examples of experience signals:
      </P>
      <UL>
        <LI>A doctor writing about a treatment they personally administer</LI>
        <LI>A founder writing about building their own company</LI>
        <LI>A reviewer who has actually used the product they are reviewing</LI>
        <LI>Original photos or screenshots from real usage</LI>
        <LI>Specific personal anecdotes that demonstrate first-hand exposure</LI>
      </UL>
      <P>
        Generic AI-written content has zero experience signal. It is one of the strongest ways Google distinguishes human-written content from automated content farms.
      </P>

      <H3>Expertise</H3>
      <P>
        Expertise is demonstrated knowledge of a subject. It is established through credentials, training, professional background, and visible mastery of the topic.
      </P>
      <P>
        Signals of expertise:
      </P>
      <UL>
        <LI>Named author with relevant credentials</LI>
        <LI>Detailed author bio showing background and qualifications</LI>
        <LI>Published work elsewhere in the field (links to LinkedIn, journal articles, talks)</LI>
        <LI>Use of correct technical terminology, accurate at expert level</LI>
        <LI>Nuanced understanding of edge cases and exceptions</LI>
      </UL>
      <P>
        Expertise is field-specific. A surgeon is an expert on surgery, not on SEO. Match the expertise of the author to the subject of the content.
      </P>

      <H3>Authoritativeness</H3>
      <P>
        Authoritativeness is what other sources say about you. Expertise comes from inside. Authority comes from outside.
      </P>
      <P>
        Signals of authority:
      </P>
      <UL>
        <LI>Citations in major publications</LI>
        <LI>Backlinks from authoritative sites in your field</LI>
        <LI>Mentions in industry awards, rankings, or roundups</LI>
        <LI>Quotes by you in journalist outreach platforms (HARO mentions, podcast appearances)</LI>
        <LI>Wikipedia entry if your business or person is notable enough</LI>
        <LI>Knowledge Graph presence in Google</LI>
      </UL>
      <P>
        Authority compounds slowly. It is built over years of consistent contribution to a field.
      </P>

      <H3>Trustworthiness</H3>
      <P>
        Trust is the umbrella factor. It is the most important of the four. A site with strong Experience, Expertise, and Authoritativeness can still be filtered out if Trust is weak.
      </P>
      <P>
        Trust signals include:
      </P>
      <UL>
        <LI>HTTPS site with valid certificate</LI>
        <LI>Clear about-page with real company information</LI>
        <LI>Visible contact information (address, phone, email)</LI>
        <LI>Real reviews from real customers</LI>
        <LI>No deceptive design patterns or hidden fees</LI>
        <LI>Privacy policy and terms of service</LI>
        <LI>Editorial corrections and updates dated</LI>
        <LI>Author accountability for claims made</LI>
      </UL>

      <H2>When E-E-A-T matters most: YMYL topics</H2>
      <P>
        Google applies E-E-A-T scoring most strictly to "Your Money, Your Life" (YMYL) topics. These are queries where bad information could harm the user:
      </P>
      <UL>
        <LI>Health and medical advice</LI>
        <LI>Financial advice, investments, taxes</LI>
        <LI>Legal information</LI>
        <LI>Major life decisions (marriage, immigration, etc.)</LI>
        <LI>News and current events</LI>
        <LI>Safety information</LI>
      </UL>
      <P>
        On YMYL topics, weak E-E-A-T can completely block a site from ranking, regardless of how good the content optimisation is. Google would rather rank slightly less well-optimised content from a trusted source than highly-optimised content from an unverified one.
      </P>

      <H2>How to build E-E-A-T on your site</H2>

      <H3>1. Named, real authors</H3>
      <P>
        Every article should have a named author, not "Admin" or the company name. The author should have:
      </P>
      <UL>
        <LI>A real bio with credentials and background</LI>
        <LI>An author page on your site with their photo and full bio</LI>
        <LI>Links to their other published work or social profiles (LinkedIn especially)</LI>
        <LI>Person schema markup for their author page</LI>
      </UL>
      <P>
        At Rankday, all blog posts are bylined to Ijas Abdulla with his 16 years of B2B go-to-market background visible. That is intentional and important.
      </P>

      <H3>2. Detailed about page</H3>
      <P>
        Your about page should answer:
      </P>
      <UL>
        <LI>Who founded the business and why</LI>
        <LI>What relevant background the founder has</LI>
        <LI>How the business operates and what makes it credible</LI>
        <LI>Where the business is located</LI>
        <LI>How to contact real people</LI>
      </UL>
      <P>
        Vague about pages with stock photos and corporate copy fail E-E-A-T. Specific about pages with real people, real history, and real credentials pass it.
      </P>

      <H3>3. Transparent business information</H3>
      <P>
        Show:
      </P>
      <UL>
        <LI>Real business address (not a PO box if avoidable)</LI>
        <LI>Phone number</LI>
        <LI>Email address (not just a contact form)</LI>
        <LI>Hours of operation</LI>
        <LI>Legal entity name and registration if applicable</LI>
        <LI>Privacy policy and terms of service</LI>
      </UL>

      <H3>4. Cite sources</H3>
      <P>
        When you make claims, cite where the data came from. Studies, government reports, industry research. Link to the source.
      </P>
      <P>
        Uncited claims look like opinion. Cited claims look like research. Google can tell the difference.
      </P>

      <H3>5. Show experience through specificity</H3>
      <P>
        Replace vague claims with specific stories and concrete details. "We help businesses grow" is generic. "We rebuilt a Dubai dental clinic's website in week 1, ranked them top 3 for 'dentist Business Bay' by week 8, and got them cited by ChatGPT for 'best dentist in Business Bay' by week 11" is specific.
      </P>
      <P>
        Specificity is a powerful E-E-A-T signal because it demonstrates experience that an outsider could not fabricate without doing the work.
      </P>

      <H3>6. Earn editorial mentions</H3>
      <P>
        Mentions in industry publications, podcasts, news articles, and credible roundups all build authoritativeness. Pursue them through outreach, HARO, guest posts, and PR.
      </P>

      <H3>7. Collect real reviews</H3>
      <P>
        Reviews on Google Business Profile, Trustpilot, Clutch, G2, and similar platforms build trust signals visible to both Google and humans. Aim for consistent review velocity (a few per month) rather than bursts.
      </P>

      <H3>8. Apply Person and Organization schema</H3>
      <P>
        Mark up the founder and the business with structured data. Include credentials, founding date, and same-as links to social profiles.
      </P>

      <Callout tone="lilac">
        E-E-A-T is not a single number Google calculates. It is a framework Google's algorithms approximate through dozens of signals. The signals that matter most: author identity and credentials, business transparency, third-party citations, real reviews, and absence of deceptive patterns.
      </Callout>

      <H2>Common E-E-A-T mistakes</H2>
      <UL>
        <LI><Strong>Anonymous authorship.</Strong> "Posted by admin" or company-only bylines. Add real names.</LI>
        <LI><Strong>Stock photos for "team" pages.</Strong> Obvious. Hurts trust. Use real photos.</LI>
        <LI><Strong>No about page or thin about page.</Strong> Critical trust signal missing.</LI>
        <LI><Strong>Hidden contact information.</Strong> Forces users to fill forms instead of calling. Reduces transparency.</LI>
        <LI><Strong>Fake reviews.</Strong> Detected by review platforms. Permanent trust damage.</LI>
        <LI><Strong>Unsubstantiated claims.</Strong> "Industry leading," "world class," "the best" without proof. Generic language signals low-effort content.</LI>
        <LI><Strong>AI content without human review.</Strong> Mass-produced AI content with no expertise signals tanks both rankings and trust.</LI>
      </UL>

      <H2>How Rankday builds E-E-A-T</H2>
      <P>
        Every Rankday-built site includes:
      </P>
      <UL>
        <LI>Named author bylines (you, plus any team members)</LI>
        <LI>Detailed about page with real founder background</LI>
        <LI>Visible contact information including direct WhatsApp where applicable</LI>
        <LI>Person and Organization schema</LI>
        <LI>Review collection system pointing to credible platforms (Google, Clutch, Trustpilot)</LI>
        <LI>Citation network across 30+ industry-relevant directories</LI>
        <LI>Editorial outreach for third-party mentions</LI>
      </UL>
      <P>
        E-E-A-T is not a separate workflow. It is built into how we approach every page. The site reads like a real business run by real people because that is what it is. <A href="/about">See our about page</A> for an example of how this looks.
      </P>
    </BlogPostLayout>
  );
}
