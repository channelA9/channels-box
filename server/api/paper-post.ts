import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import matter from "gray-matter";
import type { Context } from "hono";

function getContentDir(): string {
  return path.join(process.cwd(), "content");
}

export async function GET(c: Context) {
  const language = c.req.query("lang") || "en";
  const slug = c.req.query("slug");

  if (!slug) {
    return c.json({ error: "Missing slug parameter" }, 400);
  }

  if (language !== "en" && language !== "jp") {
    return c.json({ error: "Invalid language parameter" }, 400);
  }

  try {
    const contentDir = getContentDir();
    const filePath = path.join(contentDir, language, "papers", `${slug}.md`);
    const fileContent = await readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);
    const pageContent = await marked(content);

    return c.json({
      pageContent,
      title: frontmatter.title || slug,
      authors: frontmatter.authors || "",
      year: frontmatter.year || new Date().getFullYear(),
      venue: frontmatter.venue,
      doi: frontmatter.doi,
      url: frontmatter.url,
      category: frontmatter.category,
    });
  } catch (error) {
    console.error(`Paper not found: ${language}/papers/${slug}.md`, error);
    return c.json({ error: `Paper "${slug}" not found` }, 404);
  }
}
