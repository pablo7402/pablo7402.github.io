// Fonction Vercel (Edge) — démarre la connexion GitHub pour le mode éditeur.
// Ne gère QUE la connexion : le site lui-même reste hébergé sur GitHub Pages.

export const config = { runtime: "edge" };

export default async function handler(request) {
  const client_id = process.env.GITHUB_CLIENT_ID;

  try {
    const url = new URL(request.url);
    const redirectUrl = new URL("https://github.com/login/oauth/authorize");
    redirectUrl.searchParams.set("client_id", client_id);
    redirectUrl.searchParams.set("redirect_uri", url.origin + "/api/callback");
    redirectUrl.searchParams.set("scope", "repo user");
    redirectUrl.searchParams.set(
      "state",
      crypto.getRandomValues(new Uint8Array(12)).join("")
    );
    return Response.redirect(redirectUrl.href, 301);
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
