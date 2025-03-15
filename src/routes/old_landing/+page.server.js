// src/routes/[...catchall]/+page.server.js

import { fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-svelte';

export async function load(event) {
  // fetch your Builder content
  const content = await fetchOneEntry({
    model: 'page',
    apiKey: "7bff0c6c736b40dbaef3300a46e5008d",
    options: getBuilderSearchParams(event.url.searchParams),
    userAttributes: {
      urlPath: event.url.pathname || '/',
    },
  });
  return { content };
}