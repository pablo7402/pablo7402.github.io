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
  eleventyConfig.addFilter("validVideos", (arr) => {
    return (arr || []).filter((v) => v && v.url);
  });
  eleventyConfig.addFilter("validPhotos", (arr) => {
    return (arr || []).filter((p) => p && p.src);
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
    return collectionApi.getFilteredByGlob("src/voyages/*.md").sort((a, b) => {
      return (b.data.date || "").localeCompare(a.data.date || "");
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

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
