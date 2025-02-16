import { draftMode } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');
  const slug = searchParams.get('slug');
  const contentType = searchParams.get('contentType');

  console.log('Received preview request:', {
    secret: secret ? 'exists' : 'missing',
    path,
    slug,
    contentType
  });

  if (!process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Missing CONTENTFUL_PREVIEW_SECRET', { status: 500 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  try {
    draftMode().enable();

    let redirectUrl = '/';

    if (path) {
      redirectUrl = path;
    } else if (slug) {
      if (contentType === 'criticReview') {
        redirectUrl = `/reviews/${slug}`;
      } else {
        redirectUrl = `/exhibitions/${slug}`;
      }
    }

    return new Response(null, {
      status: 307,
      headers: {
        'Location': redirectUrl,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Preview error:', error);
    return new Response(
      JSON.stringify({ message: 'Error enabling preview mode', error }), 
      { status: 500 }
    );
  }
}