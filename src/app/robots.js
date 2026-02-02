export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Don't let Google index the admin panel
    },
    sitemap: "https://your-domain.vercel.app/sitemap.xml",
  };
}
