import Tab from "@/components/Tab";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kost Ardian",
  description: "A dummy project",
  manifest: "manifest.json"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-[100vh] w-[100vw]">
      <Tab />
      <div className="z-10 absolute">{children}</div>
      <video
        autoPlay
        loop
        muted
        className="-z-10 fixed md:scale-150 scale-[3.5] h-dvh grayscale dark:flex hidden"
      >
        <source src="/bg/bgDark.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        className="-z-10 fixed md:scale-150 scale-[3.5] h-dvh grayscale dark:hidden flex"
      >
        <source src="/bg/bgLight.mp4" type="video/mp4" />
      </video>
    </main>
  );
}
