/**
 * Pre-generates static JSON from content markdown files.
 * Run this AFTER vite build to place JSON in dist/client/data/
 * so Cloudflare Pages can serve them as static assets.
 *
 * Usage: node scripts/generate-content.mjs
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import { marked } from "marked";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const OUTPUT_DIR = path.join(ROOT, "dist", "client", "data");

const LANGUAGES = ["en", "jp"];

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

// ── Blog Data ──────────────────────────────────────────────
async function generateBlogData(lang) {
  const blogDir = path.join(CONTENT_DIR, lang, "blog");
  if (!existsSync(blogDir)) return [];

  const files = await readdir(blogDir);
  const mdFiles = files.filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    mdFiles.map(async (file) => {
      const slug = file.replace(".md", "");
      const raw = await readFile(path.join(blogDir, file), "utf-8");
      const { data: fm, content } = matter(raw);
      return {
        slug,
        href: `/blog/${slug}`,
        title: fm.title || slug,
        date: fm.date ? new Date(fm.date).toISOString() : new Date().toISOString(),
        excerpt: fm.excerpt || "",
        category: fm.category || "",
      };
    }),
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── Blog Post Detail ───────────────────────────────────────
async function generateBlogPost(lang, slug) {
  const filePath = path.join(CONTENT_DIR, lang, "blog", `${slug}.md`);
  if (!existsSync(filePath)) return null;

  const raw = await readFile(filePath, "utf-8");
  const { data: fm, content } = matter(raw);
  const pageContent = await marked(content);

  return {
    pageContent,
    title: fm.title || slug,
    date: fm.date ? new Date(fm.date).toISOString() : new Date().toISOString(),
    excerpt: fm.excerpt || "",
    category: fm.category || "",
  };
}

// ── Papers Data ────────────────────────────────────────────
async function generatePapersData(lang) {
  const papersDir = path.join(CONTENT_DIR, lang, "papers");
  if (!existsSync(papersDir)) return [];

  const files = await readdir(papersDir);
  const mdFiles = files.filter((f) => f.endsWith(".md"));

  const papers = await Promise.all(
    mdFiles.map(async (file) => {
      const slug = file.replace(".md", "");
      const raw = await readFile(path.join(papersDir, file), "utf-8");
      const { data: fm } = matter(raw);
      return {
        slug,
        title: fm.title || slug,
        authors: fm.authors || "",
        year: fm.year || new Date().getFullYear(),
        venue: fm.venue || undefined,
        doi: fm.doi || undefined,
        url: fm.url || undefined,
        category: fm.category || undefined,
      };
    }),
  );

  return papers.sort((a, b) => b.year - a.year);
}

// ── Paper Post Detail ──────────────────────────────────────
async function generatePaperPost(lang, slug) {
  const filePath = path.join(CONTENT_DIR, lang, "papers", `${slug}.md`);
  if (!existsSync(filePath)) return null;

  const raw = await readFile(filePath, "utf-8");
  const { data: fm, content } = matter(raw);
  const pageContent = await marked(content);

  return {
    pageContent,
    title: fm.title || slug,
    authors: fm.authors || "",
    year: fm.year || new Date().getFullYear(),
    venue: fm.venue || undefined,
    doi: fm.doi || undefined,
    url: fm.url || undefined,
    category: fm.category || undefined,
  };
}

// ── CV Data ────────────────────────────────────────────────
async function generateCVData() {
  const cvPath = path.join(CONTENT_DIR, "cv.yaml");
  if (!existsSync(cvPath)) return null;

  const raw = await readFile(cvPath, "utf-8");
  return yaml.load(raw);
}

// ── Main ───────────────────────────────────────────────────
async function main() {
  console.log("📦 Generating static content data...");
  await ensureDir(OUTPUT_DIR);

  for (const lang of LANGUAGES) {
    // Blog listing
    const blogPosts = await generateBlogData(lang);
    await writeFile(
      path.join(OUTPUT_DIR, `blog-${lang}.json`),
      JSON.stringify({ posts: blogPosts }),
    );
    console.log(`  ✓ blog-${lang}.json (${blogPosts.length} posts)`);

    // Individual blog posts
    for (const post of blogPosts) {
      const detail = await generateBlogPost(lang, post.slug);
      if (detail) {
        await writeFile(
          path.join(OUTPUT_DIR, `blog-post-${lang}-${post.slug}.json`),
          JSON.stringify(detail),
        );
      }
    }

    // Papers listing
    const papers = await generatePapersData(lang);
    await writeFile(
      path.join(OUTPUT_DIR, `papers-${lang}.json`),
      JSON.stringify({ papers }),
    );
    console.log(`  ✓ papers-${lang}.json (${papers.length} papers)`);

    // Individual paper posts
    for (const paper of papers) {
      const detail = await generatePaperPost(lang, paper.slug);
      if (detail) {
        await writeFile(
          path.join(OUTPUT_DIR, `paper-post-${lang}-${paper.slug}.json`),
          JSON.stringify(detail),
        );
      }
    }
  }

  // CV
  const cvData = await generateCVData();
  if (cvData) {
    await writeFile(path.join(OUTPUT_DIR, "cv.json"), JSON.stringify(cvData));
    console.log("  ✓ cv.json");
  }

  console.log("✅ Content generation complete!");
}

main().catch((err) => {
  console.error("❌ Content generation failed:", err);
  process.exit(1);
});
