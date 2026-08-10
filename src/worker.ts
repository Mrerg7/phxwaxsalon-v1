interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Consolidate host: www → apex (fixes "Alternate page with proper canonical tag")
    if (url.hostname === 'www.phxwax.salon') {
      url.hostname = 'phxwax.salon';
      return Response.redirect(url.toString(), 301);
    }

    // Serve /index.html as 200 without redirect so GSC does not flag "Page with redirect".
    // Content matches the homepage; X-Robots-Tag keeps the duplicate URL out of the index.
    if (url.pathname === '/index.html') {
      const homeRes = await env.ASSETS.fetch(new Request(new URL('/', url), request));
      const headers = new Headers(homeRes.headers);
      headers.set('X-Robots-Tag', 'noindex, follow');
      return new Response(homeRes.body, {
        status: homeRes.status,
        statusText: homeRes.statusText,
        headers,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
