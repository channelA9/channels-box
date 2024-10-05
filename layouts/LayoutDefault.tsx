import "./style.css";

import "./tailwind.css";
import { JSX, Suspense } from "solid-js";
import { Link } from "../components/Link.js";
import { SiGithub, SiLinkedin, SiInstagram } from "solid-icons/si";

export default function LayoutDefault(props: { children?: JSX.Element }) {
  return (
    <div class="bg-gray-100">
      <div class="flex flex-co max-w-screen-xl mx-auto">
        <div class="absolute ml-2 h-32 w-fit rounded-b-full">
          <div class="absolute translate-x-[264px] w-32 h-32 bg-gray-200" />
          
          <div class="absolute h-[64px] w-[320px] mt-4">
            <h1 class="text-black text-4xl font-bold m-4">channel's box</h1>
          </div>
          <div class="absolute flex place-content-evenly items-center text-2xl text-black h-[48px] rounded-full w-[300px] translate-x-[128px] translate-y-[56px] mt-4 bg-white">
            <a href="https://www.linkedin.com/in/shauncolegado/"><SiLinkedin class="hover:text-gray-500"/></a>
            <a href="https://github.com/channelA9"><SiGithub class="hover:text-gray-500"/></a>
            <a href="https://www.instagram.com/channel9a/"><SiInstagram class="hover:text-gray-500"/></a>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row font-sans w-full mt-24">
          <Sidebar>
            <Link href="/">home</Link>
            <Link href="/projects">projects</Link>
            <Link href="/blog">blog</Link>
          </Sidebar>
          <Suspense><Content>{props.children}</Content></Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Sidebar(props: { children: JSX.Element }) {
  return (
    <div
      id="sidebar"
      class="pt-12 lg:p-8 w-full justify-evenly lg:w-[200px] flex lg:flex-col shrink-0 h-fit"
    >
      {props.children}
    </div>
  );
}

function Content(props: { children: JSX.Element }) {
  return (
    <div id="page-container" class="flex-grow">
      <div id="page-content" class="m-16 min-h-screen max-w-screen-md">
        {props.children}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <>
      <footer class="w-full bg-slate-200 flex p-8">
        <h6 class="text-xs font-ligh m-auto text-slate-500">channel9's box ( •̀ ω •́ )y</h6>
      </footer>
    </>
  );
}
