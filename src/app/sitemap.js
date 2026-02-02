export default function sitemap() {
  return [
    {
      url: "https://your-domain.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://your-domain.vercel.app/items",
      lastModified: new Date(),
      changeFrequency: "daily", // Items change often
      priority: 0.8,
    },
    {
      url: "https://your-domain.vercel.app/report",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
