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

    return env.ASSETS.fetch(request);
  },
};
