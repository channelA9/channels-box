import { readFile } from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";
import type { Context } from "hono";

function getContentDir(): string {
  return path.join(process.cwd(), "content");
}

export async function GET(c: Context) {
  try {
    const contentDir = getContentDir();
    const filePath = path.join(contentDir, "cv.yaml");
    const fileContent = await readFile(filePath, "utf-8");
    const data = yaml.load(fileContent);
    return c.json(data);
  } catch (error) {
    console.error("Error loading CV data:", error);
    return c.json({ error: "Failed to load CV data" }, 500);
  }
}
