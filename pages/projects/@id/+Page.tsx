import { createSignal, onMount, Show } from "solid-js";
import { getPageContext } from "vike/getPageContext";
import Article from "../../../components/Article";
import * as matter from "gray-matter";
import {
  EmptyTemplate,
  ProjectFrontmatter,
} from "../../../types/MarkdownTypes";
import { IoArrowBack } from "solid-icons/io";
import ArticleTitle from "../../../components/ArticleTitle";
import ArticleHero from "../../../components/ArticleHero";
import ProjectStack from "../../../components/ProjectStack";
import ProjectDirectory from "../../../components/ProjectDirectory";

export default function Page() {
  const [article, setArticle] = createSignal<{
    data: ProjectFrontmatter;
    content: string;
  }>(EmptyTemplate);

  const projectArticles = import.meta.glob('../../../assets/content/projects/*.md', { as: 'raw' });

onMount(async () => {
  const articleId = getPageContext()?.routeParams.id;

  // Dynamically load the markdown file based on articleId
  if (articleId && projectArticles[`../../../assets/content/projects/${articleId}.md`]) {
    const articleFile = await projectArticles[`../../../assets/content/projects/${articleId}.md`]();
    
    const parsedArticle = matter.default(articleFile);
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
  } else {
    console.error(`Project with id ${articleId} not found.`);
  }
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
