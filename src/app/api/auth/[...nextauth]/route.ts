
// src/app/api/auth/[...nextauth]/route.ts

/**
 * This route handler is a proxy for the standalone authentication service.
 * It forwards all requests to the auth-service container, which handles the actual
 * NextAuth.js logic.
 *
 * The NEXTAUTH_URL_INTERNAL environment variable is set in the docker-compose.yml file
 * to point to the internal address of the auth-service.
 */
async function handler(req: Request) {
  // The original URL, e.g., /api/auth/session
  const url = new URL(req.url);
  const internalAuthServiceUrl = process.env.NEXTAUTH_URL_INTERNAL;

  if (!internalAuthServiceUrl) {
    console.error('FATAL: NEXTAUTH_URL_INTERNAL is not set. The auth proxy cannot function.');
    return new Response('Authentication service is misconfigured.', { status: 500 });
  }

  // Create the new URL for the internal auth service
  const proxyUrl = new URL(`${internalAuthServiceUrl}${url.pathname}${url.search}`);

  // Forward the request to the auth service
  // We create a new Request object to avoid issues with reusing the original one
  const proxyResponse = await fetch(proxyUrl.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined,
    redirect: 'manual', // Let the browser handle redirects based on the auth service's response
  });

  // Forward the response from the auth service back to the client
  return proxyResponse;
}

export { handler as GET, handler as POST };

