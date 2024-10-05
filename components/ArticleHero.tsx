import { Show } from "solid-js";
export default function ArticleHero(props: {
  hero_image: string | undefined;
}) {
  return (
    <>
      <Show when={props.hero_image != undefined}>
        <img
          src={props.hero_image}
          class=" w-full m-auto object-cover pb-4"
        />
      </Show>
    </>
  );
}
