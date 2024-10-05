import { Frontmatter } from "../types/MarkdownTypes";
import dayjs from "dayjs";
export default function ArticleTitle(props: {
  frontmatter: Frontmatter;
}) {
  return (
    <>
      <header class="pb-4 mb-4 w-full flex flex-col lg:flex-row border-b">
        <div class="flex-grow flex flex-col mb-4 lg:mb-0">
          <h1 class="font-bold text-2xl lg:text-3xl mb-4">{props.frontmatter.title}</h1>
          <h2 class="text-sm lg:text-base"> {props.frontmatter.description} </h2>
        </div>
        <div class=" flex-none flex">
          <h3 class="text-sm font-light italic">
            {dayjs(props.frontmatter.createdAt).format("MMM D, YYYY")}
          </h3>
        </div>
      </header>
    </>
  );
}
