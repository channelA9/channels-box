import { Show } from "solid-js";
export default function ArticleHero(props: {
  hero_image: string | undefined;
}) {

  // eslint-disable-next-line solid/reactivity
  const asset = new URL(props.hero_image != undefined ? props.hero_image : '', import.meta.url).href

  return (
    <>
      <Show when={props.hero_image != undefined}>
        <img
          src={asset}
          class=" w-full m-auto object-cover pb-4"
        />
      </Show>
    </>
  );
}
