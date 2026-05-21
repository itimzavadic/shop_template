export const heroSectionsQuery = `
  *[_type == "heroSection"] | order(order asc) {
    title,
    subtitle,
    ctaText,
    ctaLink,
    "backgroundImage": backgroundImage.asset->url,
    layout,
    order
  }
`;

export const editorialBlocksQuery = `
  *[_type == "editorialBlock"] | order(order asc) {
    title,
    "slug": slug.current,
    description,
    body,
    "image": image.asset->url,
    imagePosition,
    ctaText,
    ctaLink,
    order
  }
`;

export const collectionsQuery = `
  *[_type == "collection"] | order(order asc) {
    title,
    "slug": slug.current,
    shopifyCollectionHandle,
    description,
    "image": image.asset->url,
    type,
    order
  }
`;

export const featuredBrandsQuery = `
  *[_type == "brand" && featured == true] {
    name,
    "slug": slug.current,
    description,
    "logo": logo.asset->url,
    website
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    title,
    description,
    "logo": logo.asset->url,
    menuItems
  }
`;