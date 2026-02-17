import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || '9927twz3',
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: import.meta.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Query helpers
export async function getBlogPosts(limit?: number) {
  const limitClause = limit ? `[0...${limit}]` : '';
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) ${limitClause} {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage,
      "author": author->{ name, photo }
    }`
  );
}

export async function getBlogPost(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage,
      body,
      tags,
      seoTitle,
      seoDescription,
      "author": author->{ name, role, photo }
    }`,
    { slug }
  );
}

export async function getTestimonials(featured?: boolean) {
  const filter = featured ? ' && featured == true' : '';
  return client.fetch(
    `*[_type == "testimonial"${filter}] {
      _id,
      quote,
      personName,
      personRole,
      companyName,
      companyLogo,
      advisoryPillars,
      industry
    }`
  );
}

export async function getClientLogos() {
  return client.fetch(
    `*[_type == "clientLogo"] | order(displayOrder asc) {
      _id,
      name,
      logo,
      url
    }`
  );
}

export async function getTeamMembers() {
  return client.fetch(
    `*[_type == "teamMember"] | order(displayOrder asc) {
      _id,
      name,
      role,
      photo,
      bio,
      institutionalBackground,
      linkedinUrl
    }`
  );
}

export async function getFxAcademyModules() {
  return client.fetch(
    `*[_type == "fxAcademyModule"] | order(moduleNumber asc) {
      _id,
      title,
      slug,
      moduleNumber,
      description,
      featuredImage
    }`
  );
}

export async function getFxAcademyModule(slug: string) {
  return client.fetch(
    `*[_type == "fxAcademyModule" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      moduleNumber,
      description,
      featuredImage,
      body,
      seoTitle,
      seoDescription,
      "relatedGlossaryTerms": relatedGlossaryTerms[]->{ term, slug }
    }`,
    { slug }
  );
}

export async function getGlossaryEntries() {
  return client.fetch(
    `*[_type == "glossaryEntry"] | order(term asc) {
      _id,
      term,
      slug
    }`
  );
}

export async function getGlossaryEntry(slug: string) {
  return client.fetch(
    `*[_type == "glossaryEntry" && slug.current == $slug][0] {
      _id,
      term,
      slug,
      definition,
      "relatedTerms": relatedTerms[]->{ term, slug }
    }`,
    { slug }
  );
}

export async function getCaseStudies() {
  return client.fetch(
    `*[_type == "caseStudy"] | order(_createdAt desc) {
      _id,
      clientName,
      slug,
      industry,
      advisoryPillars,
      pullQuote,
      featuredImage,
      clientLogo
    }`
  );
}

export async function getCaseStudy(slug: string) {
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      clientName,
      slug,
      industry,
      advisoryPillars,
      clientLogo,
      featuredImage,
      challenge,
      advisoryEngagement,
      strategy,
      platformImplementation,
      results,
      pullQuote,
      pullQuoteAttribution,
      seoTitle,
      seoDescription
    }`,
    { slug }
  );
}

export async function getWebinars() {
  return client.fetch(
    `*[_type == "webinar"] | order(eventDate desc) {
      _id,
      title,
      slug,
      eventDate,
      description,
      thumbnail,
      recordingUrl,
      registrationUrl,
      "speakers": speakers[]->{ name, role, photo }
    }`
  );
}

export async function getWebinar(slug: string) {
  return client.fetch(
    `*[_type == "webinar" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      eventDate,
      description,
      thumbnail,
      recordingUrl,
      registrationUrl,
      "speakers": speakers[]->{ name, role, photo }
    }`,
    { slug }
  );
}

export async function getPage(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      heroTitle,
      heroSubtitle,
      primaryCta,
      secondaryCta,
      sections[] {
        _type,
        _key,
        _type == "sectionRichText" => {
          content,
          bgClass,
          maxWidth
        },
        _type == "sectionFeatureGrid" => {
          heading,
          subheading,
          features[] { title, description, href, icon },
          columns,
          bgClass
        },
        _type == "sectionStepProcess" => {
          heading,
          subheading,
          steps[] { title, description },
          bgClass
        },
        _type == "sectionTestimonials" => {
          heading,
          subheading,
          testimonialSource,
          referencedTestimonials[]-> {
            quote, personName, personRole, companyName
          },
          inlineTestimonials[] {
            quote, personName, personRole, companyName
          },
          bgClass
        },
        _type == "sectionCta" => {
          headline,
          primaryCta,
          secondaryCta,
          bgClass
        },
        _type == "sectionLatestPosts" => {
          heading,
          subheading,
          numberOfPosts,
          showViewAllLink,
          bgClass
        },
        _type == "sectionTeamGrid" => {
          heading,
          subheading,
          teamMembers[]-> {
            _id, name, role, photo,
            institutionalBackground, linkedinUrl, bio
          },
          bgClass
        },
        _type == "sectionTrustBar" => {
          label,
          logos[]-> { _id, name, logo, url }
        },
        _type == "sectionImage" => {
          image,
          alt,
          caption,
          layout,
          bgClass
        },
        _type == "sectionTwoColumn" => {
          leftColumn {
            contentType, richText, image, imageAlt
          },
          rightColumn {
            contentType, richText, image, imageAlt
          },
          verticalAlign,
          columnGap,
          bgClass
        }
      },
      seoTitle,
      seoDescription
    }`,
    { slug }
  );
}
