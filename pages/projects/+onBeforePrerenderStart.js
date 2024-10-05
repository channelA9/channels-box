let hasRun = false; // Global flag to prevent re-execution

export default function onBeforePrerenderStart() {
  if (hasRun) return []; // If it has run, return an empty array

  // Set the flag to true to prevent further execution
  hasRun = true;

  // Glob import to read all markdown files
  const postFiles = import.meta.glob('/assets/content/projects/*.md', { eager: true });

  const uniqueRoutes = new Set();

  const prerenderRoutes = Object.keys(postFiles).map((path) => {
    const routePath = path
      .replace('/assets/content/projects/', '/projects/')
      .replace('.md', '');

    if (!uniqueRoutes.has(routePath)) {
      uniqueRoutes.add(routePath);
      return {
        url: routePath,
        pageContext: { path }
      };
    }
  }).filter(Boolean);

  return prerenderRoutes;
}
