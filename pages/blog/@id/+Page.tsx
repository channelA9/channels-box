import { createSignal, onMount } from "solid-js";

import Article from "../../../components/Article";
import ArticleHero from "../../../components/ArticleHero";
import ArticleTitle from "../../../components/ArticleTitle";

import * as matter from "gray-matter";
import { getPageContext } from "vike/getPageContext";
import { BlogFrontmatter, EmptyTemplate } from "../../../types/MarkdownTypes";
import { IoArrowBack } from "solid-icons/io";

export default function Page() {
  const [article, setArticle] = createSignal<{
    data: BlogFrontmatter;
    content: string;
  }>(EmptyTemplate);

  const blogPosts = import.meta.glob(
    "../../../assets/content/blogs/*.md",
    { as: "raw" }
  );

  onMount(async () => {
    const articleId = getPageContext()?.routeParams.id;

    if (
      articleId &&
      blogPosts[`../../../assets/content/blogs/${articleId}.md`]
    ) {
      const articleFile =
        await blogPosts[
          `../../../assets/content/blogs/${articleId}.md`
        ]();

      const parsedArticle = matter.default(articleFile);
      setArticle({
        data: {
          title: parsedArticle.data.title,
          description: parsedArticle.data.description,
          createdAt: new Date(parsedArticle.data.createdAt),
          author: parsedArticle.data.author,
          hero_image: parsedArticle.data.hero_image,
          from: parsedArticle.data.from,
          id: parsedArticle.data.id,
        },
        content: parsedArticle.content
      });
    } else {
      console.error(`Project with id ${articleId} not found.`);
    }
  });

  return (
    <div>
    <a href="/blog" class="p-1 text-4xl absolute -translate-x-14 hover:animate-pulse"><IoArrowBack/></a>
    <ArticleHero hero_image={article().data.hero_image} />
    <ArticleTitle frontmatter={article().data} />
    <Article content={article().content} />
  </div>
  );
}
