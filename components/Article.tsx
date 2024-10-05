import { SolidMarkdown } from "solid-markdown";
export default function Article(props: {
  content: string;
}) {
  return (
    <>
      <article class="prose  min-w-full">
        <SolidMarkdown>{props.content}</SolidMarkdown>
      </article>
    </>
  );
}
