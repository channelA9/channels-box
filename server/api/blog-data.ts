import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Context } from "hono";

export interface BlogArticle {
  title: string;
  date: Date;
  href: string;
  excerpt?: string;
  category?: string;
  slug: string;
}

function getContentDir(): string {
  return path.join(process.cwd(), "content");
}

export async function GET(c: Context) {
  const language = c.req.query("lang") || "en";

  if (language !== "en" && language !== "jp") {
    return c.json({ error: "Invalid language parameter" }, 400);
  }

  try {
    const contentDir = getContentDir();
    const blogDir = path.join(contentDir, language, "blog");

    const files = await readdir(blogDir);
    const mdFiles = files.filter((file: string) => file.endsWith(".md"));

    const articles: BlogArticle[] = await Promise.all(
      mdFiles.map(async (file: string): Promise<BlogArticle> => {
        const slug = file.replace(".md", "");
        const filePath = path.join(blogDir, file);
        const fileContent = await readFile(filePath, "utf-8");
        const { data: frontmatter } = matter(fileContent);

        const title = frontmatter.title || slug;
        const date = frontmatter.date ? new Date(frontmatter.date) : new Date();
        const href = `/blog/${slug}`;
        const excerpt = frontmatter.excerpt;
        const category = frontmatter.category;

        return { title, date, href, excerpt, category, slug };
      }),
    );

    const sortedArticles = articles.sort((a, b) => b.date.getTime() - a.date.getTime());

    return c.json({ articles: sortedArticles });
  } catch (error) {
    console.error(`Error loading blog data for ${language}:`, error);
    return c.json({ error: "Failed to load blog data", articles: [] }, 500);
  }
}
