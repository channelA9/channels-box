import { createSignal, onMount, For } from "solid-js";
import * as matter from "gray-matter";
import { BlogFrontmatter } from "../../types/MarkdownTypes";
import dayjs from "dayjs";

export default function Page() {
  const [posts, setPosts] = createSignal<BlogFrontmatter[]>([]);

  onMount(() => {
    const postFiles = import.meta.glob('/assets/content/blogs/*.md', { as: 'raw' });

    const postPromises = Object.keys(postFiles).map(async (path) => {
      const file = await postFiles[path]();
      const data = matter.default(file);
      return { ...data.data, path: path.replace('/assets/content/blogs/', '').replace('.md', '') } as BlogFrontmatter & { path: string };
    });

    Promise.all(postPromises).then((results) => {
      const sortedResults = results.sort(
        (resA, resB) =>
          new Date(resA.createdAt).getTime() -
          new Date(resB.createdAt).getTime()
      );
      setPosts(sortedResults);
    });
  });

  return (
    <>
      <h1 class="font-bold text-3xl pb-4">Blog</h1>
      <div class="space-y-4">
        <For each={posts()}>
          {(post) => (
            <Post
              name={post.title}
              link={`/blog/${post.id}`}
              description={post.description}
              date={dayjs(new Date(post.createdAt))}
            />
          )}
        </For>
      </div>
    </>
  );
}


function Post(props: {
  name: string;
  link: string;
  description: string;
  date: dayjs.Dayjs;
}) {
  return (
    <a href={props.link}>
      <div class="relative overflow-hidden h-fit w-full group border rounded-md p-4 mb-2 flex group-[] hover:border-gray-100 hover:bg-gradient-to-r from-gray-50 to-gray-100">
        <div class="group-hover:block group-hover:w-4 h-12 w-0 transition-all ease-out" />
        <div class="flex flex-col">
          <h1 class="text-xl font-semibold z-20">{props.name}</h1>
          <h2 class="text-sm text-gray-500 z-20 mb-2">
            {props.date.format("MMM D, YYYY")}
          </h2>
          <p class="text-gray-500 z-20">{props.description}</p>
        </div>
      </div>
    </a>
  );
}
