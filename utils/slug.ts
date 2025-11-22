// slug.ts
//
// Provides a slugify helper function that lowercases text, removes accent marks
// (diacritics), replaces whitespace with hyphens and strips out any
// non-word characters. This helper is used throughout the frontend to
// generate URL-friendly slugs for category names and to compare slugs
// consistently with the values stored in the database.

export const slugify = (text: string = ''): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}]/gu, '-')        // replace non letters/digits with hyphens
    .replace(/[\u0300-\u036f]/g, '')        // remove accent marks
    .replace(/\s+/g, '-')                    // collapse whitespace to hyphen
    .replace(/[^\w-]/g, '')                  // remove any remaining non-word chars
    .replace(/--+/g, '-')                     // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');                 // trim leading/trailing hyphens
};