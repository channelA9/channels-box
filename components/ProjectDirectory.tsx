import { SiGithub } from "solid-icons/si";
import { BiSolidRightArrow } from "solid-icons/bi";
import { Show } from "solid-js";

export default function ProjectDirectory(props: {
  viewLink?: string;
  gitLink?: string;
}) {
  return (
    <div class="flex lg:float-right justify-evenly">
      <Show when={props.gitLink}>
        <a href={props.gitLink}>
          <div class="flex p-2 items-center justify-evenly rounded w-fit  border border-b-4 border-blue-400 bg-blue-100 hover:bg-blue-300 hover:border-blue-500 hover:border-b hover:border-t-4">
            <h1 class="lg:text-lg mr-2">Github</h1>
            <SiGithub class="" />
          </div>
        </a>
      </Show>
      <Show when={props.viewLink}>
        <a href={props.viewLink}>
          <div class="flex p-2 ml-2 items-center justify-evenly rounded w-fit border border-b-4 border-red-400 bg-red-100 hover:bg-red-300 hover:border-red-500 hover:border-b hover:border-t-4">
            <h1 class="lg:text-lg mr-2">Visit Project</h1>
            <BiSolidRightArrow class="" />
          </div>
        </a>
      </Show>
    </div>
  );
}
