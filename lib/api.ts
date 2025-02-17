const EXHIBITION_GRAPHQL_FIELDS = `
  name
  shortName
  slug
  startDate
  endDate
  description {
    json
  }
  artist {
    name
  }
  artworksCollection {
    items {
      name
      image {
        url
        width
        height
      }
    }
  }
`;

const REVIEW_GRAPHQL_FIELDS = `
  title
  criticName
  slug
  review {
    json
  }
  sys {
    id
  }
  artwork {
    name
    image {
      url
      width
      height
    }
    artist {
      name
    }
  }
`;

const BIO_GRAPHQL_FIELDS = `
  name
  description
  image {
    url
    width
    height
  }
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      cache: preview ? 'no-store' : 'default',
      next: { tags: ["reviews"] } 
    },
  ).then((response) => response.json());
}

function extractExhibition(fetchResponse: any): any {
  return fetchResponse?.data?.exhibitionCollection?.items?.[0];
}

function extractReview(fetchResponse: any): any {
  return fetchResponse?.data?.criticReviewCollection?.items?.[0];
}



export async function getHomePageContent(preview = false) {
  const entry = await fetchGraphQL(
    `query {
      heroCollection(limit: 1, preview: ${preview ? "true" : "false"}) {
        items {
          title
          subtitle
          description
          image {
            url
            width
            height
          }
        }
      }
      exhibitionCollection(preview: ${preview ? "true" : "false"}) {
        items {
          ${EXHIBITION_GRAPHQL_FIELDS}
        }
      }
      aboutCollection(limit: 1, preview: ${preview ? "true" : "false"}) {
        items {
          title
          content {
            json
          }
          image {
            url
            width
            height
          }
        }
      }
    }`,
    preview
  );
  return entry?.data;
}

export async function getExhibitionBySlug(slug: string, preview = false) {
  const entry = await fetchGraphQL(
    `query {
      exhibitionCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${EXHIBITION_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return extractExhibition(entry);
}

export async function getPreviewExhibitionBySlug(slug: string) {
  const entry = await fetchGraphQL(
    `query {
      exhibitionCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${EXHIBITION_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractExhibition(entry);
}

export async function getReviewBySlug(slug: string, preview = false) {
  // Add this line for debugging
  console.log('getReviewBySlug called with preview:', preview);
  
  const query = `query {
    criticReviewCollection(
      where: { slug: "${slug}" }
      preview: ${preview ? "true" : "false"}
      limit: 1
    ) {
      items {
        ${REVIEW_GRAPHQL_FIELDS}
      }
    }
  }`;

  console.log('Executing query:', query);
  
  const entry = await fetchGraphQL(query, preview);
  
  console.log('Review response:', entry);
  
  return extractReview(entry);
}

export async function getPreviewReviewBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      criticReviewCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${REVIEW_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractReview(entry);
}

export async function getClues(preview = false) {
  const query = `
    query {
      topSecretDoNotLookCollection(order: clueNumber_ASC) {
        items {
          clueNumber
          clueTitle
          clueDescription
          hint
          clueCode
          description
        }
      }
    }
  `;
  
  const entry = await fetchGraphQL(query, preview);
  return entry?.data?.topSecretDoNotLookCollection?.items;
}

export async function getAllExhibitions(preview = false) {
  const entry = await fetchGraphQL(
    `query {
      exhibitionCollection(order: startDate_ASC, preview: ${preview ? "true" : "false"}) {
        items {
          ${EXHIBITION_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return entry?.data?.exhibitionCollection?.items;
}

export async function getBio(preview = false) {
  const bioQuery = `
    query {
      bioCollection {
        items {
          ${BIO_GRAPHQL_FIELDS}
        }
      }
    }
  `;
  
  const bioEntry = await fetchGraphQL(bioQuery, preview);
  return bioEntry?.data?.bioCollection?.items?.[0];
}