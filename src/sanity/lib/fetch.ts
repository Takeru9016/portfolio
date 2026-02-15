import { client } from "./client";
import {
  siteSettingsQuery,
  allProjectsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  allExperienceQuery,
  getSkillsQuery,
} from "./queries";

export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery);
}

export async function getAllProjects() {
  return client.fetch(allProjectsQuery);
}

export async function getFeaturedProjects() {
  return client.fetch(featuredProjectsQuery);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(projectBySlugQuery, { slug });
}

export async function getAllExperience() {
  return client.fetch(allExperienceQuery);
}

export async function getSkills() {
  return client.fetch(getSkillsQuery);
}