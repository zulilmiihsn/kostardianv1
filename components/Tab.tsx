'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import Switcher from "./Switcher";
import { Actor } from "next/font/google";

const actor = Actor({subsets: ["latin"], weight: "400"})

const hoverSounds = () => {
  const audioElement = new Audio('assets/hover.flac');
  audioElement.play();
}

const clickSounds = () => {
  const audioElement = new Audio('assets/click.mp3');
  audioElement.play();
}

export default function Tab() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-2 inset-x-0 flex justify-center drop-shadow-xl overflow-visible z-20">
      <div className={`w-fit bg-[#181818] p-2 rounded-xl flex gap-4 items-center ${actor.className}`}>
        <Switcher/>
        <Link
          href={"/home"}
          className={`${pathname === '/home' ? 'bg-white text-black font-semibold' : 'text-white outline outline-1' } p-1 rounded-lg hover:drop-shadow-glow hover:-translate-y-1 transition ease-in-out`} onMouseEnter={hoverSounds} onClick={clickSounds}>
          Beranda
        </Link>
        <Link href={"/debttracker"} className={`${pathname === '/debttracker' ? 'bg-white text-black font-semibold' : 'text-white outline outline-1' } p-1 rounded-lg hover:drop-shadow-glow hover:-translate-y-1 transition ease-in-out`} onMouseEnter={hoverSounds} onClick={clickSounds}>
          Pencatat Hutang
        </Link>
      </div>
    </nav>
  );
}
