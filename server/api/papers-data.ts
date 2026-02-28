import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Context } from "hono";

export interface PaperArticle {
  title: string;
  authors: string;
  year: number;
  venue?: string;
  doi?: string;
  url?: string;
  category?: string;
  slug: string;
}

function getContentDir(): string {
  // In dev, content is at project root; in production (Cloudflare), it's at dist/server/content
  const possiblePaths = [
    path.join(process.cwd(), "content"),
    path.join(process.cwd(), "dist", "server", "content"),
  ];
  return possiblePaths[0]; // fs access will handle errors
}

export async function GET(c: Context) {
  const language = c.req.query("lang") || "en";

  if (language !== "en" && language !== "jp") {
    return c.json({ error: "Invalid language parameter" }, 400);
  }

  try {
    const contentDir = getContentDir();
    const papersDir = path.join(contentDir, language, "papers");

    const files = await readdir(papersDir);
    const mdFiles = files.filter((file: string) => file.endsWith(".md"));

    const papers: PaperArticle[] = await Promise.all(
      mdFiles.map(async (file: string): Promise<PaperArticle> => {
        const slug = file.replace(".md", "");
        const filePath = path.join(papersDir, file);
        const fileContent = await readFile(filePath, "utf-8");
        const { data: frontmatter } = matter(fileContent);

        return {
          title: frontmatter.title || slug,
          authors: frontmatter.authors || "",
          year: frontmatter.year || new Date().getFullYear(),
          venue: frontmatter.venue,
          doi: frontmatter.doi,
          url: frontmatter.url,
          category: frontmatter.category,
          slug,
        };
      }),
    );

    const sortedPapers = papers.sort((a, b) => b.year - a.year);
    return c.json({ papers: sortedPapers });
  } catch (error) {
    console.error(`Error loading papers data for ${language}:`, error);
    return c.json({ error: "Failed to load papers data", papers: [] }, 500);
  }
}
