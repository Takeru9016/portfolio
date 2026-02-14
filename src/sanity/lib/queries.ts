import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    name,
    tagline,
    bio,
    aboutText,
    profileImage,
    resumeFile { asset-> { url } },
    email,
    github,
    linkedin,
    twitter,
    funFacts,
    stats
  }
`;

// Projects
export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    image,
    tags,
    category,
    liveUrl,
    githubUrl,
    featured,
    publishedAt
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) [0...3] {
    _id,
    title,
    slug,
    description,
    image,
    tags,
    category,
    liveUrl,
    githubUrl
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    image,
    gallery,
    tags,
    category,
    liveUrl,
    githubUrl,
    publishedAt
  }
`;

// Experience
export const allExperienceQuery = groq`
  *[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    role,
    logo,
    startDate,
    endDate,
    current,
    description,
    highlights,
    technologies
  }
`;

// Skills
export const allSkillsQuery = groq`
  *[_type == "skill"] | order(order asc) {
    _id,
    name,
    icon,
    category,
    proficiency
  }
`;
