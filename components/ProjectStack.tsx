import { IconTypes } from "solid-icons";
import { SiCloudflare, SiSolid, SiSupabase, SiTailwindcss, SiVite, SiLua } from "solid-icons/si";
import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

export default function ProjectStack(props: { stackdef: string }) {
  const stacks: string[] = props.stackdef.split(",");
  return (
    <>
      <div class="py-4 lg:pt-0 w-full flex flex-col border-b">
        <div class="flex flex-row items-center justify-center lg:justify-start">
        <For each={stacks}>
          {(stackItem) => (
            <div class="m-2 lg:w-16 lg:h-16 flex items-center justify-center flex-col">
              <Show when={stackIconDefs[stackItem]}>
                <Dynamic component={stackIconDefs[stackItem]} class="text-2xl lg:text-4xl"/>
              </Show>
              <h2 class="text-xs font-light mt-2">{stackItem}</h2>
            </div>
          )}
        </For>
        </div>
      </div>
    </>
  );
}

const stackIconDefs: Record<string, IconTypes> = {
  SolidJS: SiSolid,
  TailwindCSS: SiTailwindcss,
  Vite: SiVite,
  Cloudflare: SiCloudflare,
  Supabase: SiSupabase,
  Lua: SiLua
};
