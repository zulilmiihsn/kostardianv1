'use client'
import Typewriter from "@/components/Typewriter";

export default function Home() {
  return (
    <>
      <div className="h-[100vh] w-[100vw] grid place-content-center text-center leading-normal md:leading-[4]">
        <h1 className="dark:text-secondary text-black text-[54px] md:text-[72px] leading-none font-semibold drop-shadow-md">ARDIAN KOST</h1>
        <div className="text-[24px] dark:text-secondary text-black h-[24px] flex justify-center text-center drop-shadow-md"><Typewriter/></div>
      </div>
    </>
  );
}
