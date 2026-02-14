import type { SchemaTypeDefinition } from "sanity";

import project from "./project";
import experience from "./experience";
import skill from "./skill";
import siteSettings from "./site-settings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, experience, skill, siteSettings],
};
