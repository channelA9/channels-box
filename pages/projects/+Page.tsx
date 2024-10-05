import { JSX } from "solid-js";

export default function Page() {
  return (
    <>
      <h1 class="font-bold text-3xl pb-4">Projects</h1>
      <div class="grid lg:grid-flow-row grid-cols-1 sm:grid-cols-3">
        <Category category="Websites">
          <Item
            name="Shaved By Grace"
            link="/projects/shaved-by-grace"
            />
          <Item
            name="channel's box"
            link="/projects/channels-box"
          />
        </Category>
        <Category category="Games">
          <Item
            name="Roblox Rush Revolution"
            link="/projects/roblox-rush-revolution"
          />
        </Category>
      </div>
    </>
  );
}

function Category(props: { category: string; children: JSX.Element }) {
  return (
    <div
      id={`${props.category.toLowerCase()}-container`}
      class="mb-8 border-l pl-4 hover:border-black"
    >
      <h2 class="text-lg font-bold pb-4">{props.category}</h2>
      <div class="flex flex-col">{props.children}</div>
    </div>
  );
}

function Item(props: { name: string; link: string}) {
  return (
    <a href={props.link} class="w-50 h-34 pb-2 group">
      <h2 class="text-md z-20 font-light group-hover:underline">
        {props.name}
      </h2>
    </a>
  );
}
