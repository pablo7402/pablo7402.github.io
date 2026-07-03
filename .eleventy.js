module.exports = function (eleventyConfig) {
  // Filtres utilitaires
  eleventyConfig.addFilter("slugify", (str) => {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });
  eleventyConfig.addFilter("limit", (arr, n) => {
    return (arr || []).slice(0, n);
  });
  eleventyConfig.addFilter("hostname", (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (e) {
      return "";
    }
  });
  eleventyConfig.addFilter("sumBy", (arr, key) => {
    return (arr || []).reduce((total, item) => total + (Number(item.data[key]) || 0), 0);
  });
  eleventyConfig.addFilter("formatPrice", (n) => {
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(n) || 0);
  });
  eleventyConfig.addFilter("byCategory", (arr, slug) => {
    return (arr || []).filter((item) => item.data.categorie === slug);
  });
  eleventyConfig.addFilter("youtubeId", (url) => {
    if (!url) return "";
    const match = String(url).match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : "";
  });
  // Decap enregistre parfois ces listes comme des textes simples, parfois
  // comme des objets ({ src: ... }) selon la façon dont l'entrée a été créée.
  // Ces filtres acceptent les deux formats et renvoient toujours du texte simple.
  eleventyConfig.addFilter("validVideos", (arr) => {
    return (arr || [])
      .map((v) => (typeof v === "string" ? v : v && v.url))
      .filter(Boolean);
  });
  eleventyConfig.addFilter("validPhotos", (arr) => {
    return (arr || [])
      .map((p) => (typeof p === "string" ? p : p && p.src))
      .filter(Boolean);
  });
  eleventyConfig.addFilter("validTags", (arr) => {
    return (arr || [])
      .map((t) => (typeof t === "string" ? t : t && t.label))
      .filter(Boolean);
  });
  eleventyConfig.addFilter("shorten", (str, n) => {
    const s = String(str || "");
    return s.length > n ? s.slice(0, n).trim() + "…" : s;
  });
  eleventyConfig.addFilter("journeyMeta", (data) => {
    if (!data) return "";
    const parts = [];
    if (data.region) parts.push(data.region);
    if (data.date) {
      const d = new Date(data.date);
      if (!isNaN(d)) {
        parts.push(
          d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
        );
      }
    }
    if (data.distance) parts.push(data.distance);
    if (data.duree) parts.push(data.duree);
    return parts.join(" &middot; ");
  });

  // Fichiers/dossiers copiés tels quels vers la sortie
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Collection Voyages, triée du plus récent au plus ancien
  eleventyConfig.addCollection("voyages", (collectionApi) => {
    const toTime = (d) => {
      if (!d) return 0;
      const t = new Date(d).getTime();
      return isNaN(t) ? 0 : t;
    };
    return collectionApi.getFilteredByGlob("src/voyages/*.md").sort((a, b) => {
      return toTime(b.data.date) - toTime(a.data.date);
    });
  });

  // Toutes les entrées de la Wishlist (non filtrées)
  eleventyConfig.addCollection("wishlist", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/wishlist/*.md");
  });

  // Catégories de la Wishlist, gérées librement depuis /admin, triées par "ordre"
  eleventyConfig.addCollection("categories", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/categories/*.md").sort((a, b) => {
      return (Number(a.data.ordre) || 0) - (Number(b.data.ordre) || 0);
    });
  });

  // Garage : les motos, triées par "ordre"
  eleventyConfig.addCollection("garage", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/garage/*.md").sort((a, b) => {
      return (Number(a.data.ordre) || 0) - (Number(b.data.ordre) || 0);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
