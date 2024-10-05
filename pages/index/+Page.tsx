import { SolidMarkdown } from "solid-markdown";
import * as matter from "gray-matter";


import content from '../../assets/content/home.md?raw'

export default function Page() {
  return (
    <>
      <div class="flex">
        <img src="/images/pikachu-0008.gif" />
        <img src="/images/pikachu-0008.gif" />
        <img src="/images/pikachu-0008.gif" />
      </div>
      <article class="prose  min-w-full">
        <SolidMarkdown>{content}</SolidMarkdown>
      </article>
    </>
  );
}
