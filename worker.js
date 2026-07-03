// Point d'entrée du Worker : gère les 2 routes d'authentification GitHub
// (/api/auth et /api/callback) et sert le site statique pour tout le reste.

import { onRequest as authHandler } from "./functions/api/auth.js";
import { onRequest as callbackHandler } from "./functions/api/callback.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/auth") {
      return authHandler({ request, env, ctx });
    }
    if (url.pathname === "/api/callback") {
      return callbackHandler({ request, env, ctx });
    }

    return env.ASSETS.fetch(request);
  },
};
