'use client'
import Typewriter from "@/components/Typewriter";

export default function Home() {
  return (
    <>
      <div className="h-dvh w-dvw grid place-content-center text-center leading-normal md:leading-[4] drop-shadow-xl">
        <h1 className="dark:text-secondary text-black text-[54px] md:text-[72px] leading-none font-semibold">ARDIAN KOST</h1>
        <div className="text-[24px] dark:text-secondary text-black h-[24px] flex justify-center"><Typewriter/></div>
      </div>
    </>
  );
}
