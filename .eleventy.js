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

  // Collections Wishlist par catégorie
  eleventyConfig.addCollection("wishlistEquipement", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/wishlist/*.md").filter(
      (item) => item.data.categorie === "equipement"
    );
  });
  eleventyConfig.addCollection("wishlistDestinations", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/wishlist/*.md").filter(
      (item) => item.data.categorie === "destinations"
    );
  });
  eleventyConfig.addCollection("wishlistModifications", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/wishlist/*.md").filter(
      (item) => item.data.categorie === "modifications"
    );
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
