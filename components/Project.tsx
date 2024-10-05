import { createSignal, onMount, Show } from "solid-js";

import Article from "./Article";
import * as matter from "gray-matter";
import { EmptyTemplate, ProjectFrontmatter } from "../types/MarkdownTypes";
import { getPageContext } from "vike/getPageContext";

import { IoArrowBack } from "solid-icons/io";
import ArticleTitle from "./ArticleTitle";
import ArticleHero from "./ArticleHero";
import ProjectStack from "./ProjectStack";
import ProjectDirectory from "./ProjectDirectory";

export default function Project(props: {id: string}) {
  const [article, setArticle] = createSignal<{
    data: ProjectFrontmatter;
    content: string;
  }>(EmptyTemplate);

  onMount(async () => {
    const articleFile = await import(
      /* @vite-ignore */
      `./../../../assets/content/projects/${props.id}.md?raw`
    );

    const parsedArticle = matter.default(articleFile.default);
    setArticle({
      data: {
        title: parsedArticle.data.title,
        description: parsedArticle.data.description,
        createdAt: new Date(parsedArticle.data.createdAt),
        hero_image: parsedArticle.data.hero_image,
        id: parsedArticle.data.id,
        stack: parsedArticle.data.stack,
        viewLink: parsedArticle.data.viewLink,
        gitLink: parsedArticle.data.gitLink,
      },
      content: parsedArticle.content,
    });
  });

  return (
    <div>
      <a
        href="/projects"
        class="p-1 text-4xl absolute -translate-x-14 hover:animate-pulse"
      >
        <IoArrowBack />
      </a>
      <Show when={article() != EmptyTemplate}>
        <ArticleTitle frontmatter={article().data} />
        <ArticleHero hero_image={article().data.hero_image} />
        <ProjectDirectory
          gitLink={article().data.gitLink}
          viewLink={article().data.viewLink}
        />
        <ProjectStack stackdef={article().data.stack} />
        <Article content={article().content} />
      </Show>
    </div>
  );
}
