import { createTodoHandler } from "./server/create-todo-handler";
import { vikeHandler } from "./server/vike-handler";
import { GET as getBlogData } from "./server/api/blog-data";
import { GET as getBlogPost } from "./server/api/blog-post";
import { GET as getPapersData } from "./server/api/papers-data";
import { GET as getPaperPost } from "./server/api/paper-post";
import { GET as getCvData } from "./server/api/cv-data";
import { Hono } from "hono";
import { createHandler } from "@universal-middleware/hono";

const app = new Hono();

app.post("/api/todo/create", createHandler(createTodoHandler)());
app.get("/api/blog-data", getBlogData);
app.get("/api/blog-post", getBlogPost);
app.get("/api/papers-data", getPapersData);
app.get("/api/paper-post", getPaperPost);
app.get("/api/cv-data", getCvData);

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)());

export default app;
