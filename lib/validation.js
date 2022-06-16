export const validateBlogSlug = (slug) => {
  // replace all spaces with hyphens
  slug = slug.replace(/\s+/g, "-");

  // remove all non-alphanumeric characters
  slug = slug.replace(/[^a-zA-Z0-9-]/g, "");

  // remove trailing hyphens
  slug = slug.replace(/^-+/, "");

  // remove leading hyphens
  slug = slug.replace(/-+$/, "");

  // convert to lowercase
  slug = slug.toLowerCase();

  return slug;
};
