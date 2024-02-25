import Tab from "@/components/Tab";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kost Ardian",
  description: "A dummy project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-dvh w-dvw">
      <Tab />
      <div className="z-10 absolute">{children}</div>
      <video
        src={require(`@/public/bg/bgDark.webm`)}
        autoPlay={true}
        loop={true}
        muted={true}
        className="-z-10 fixed md:scale-150 scale-[3.5] h-dvh grayscale dark:flex hidden"
      />
      <video
        src={require(`@/public/bg/bgLight.webm`)}
        autoPlay={true}
        loop={true}
        muted={true}
        className="-z-10 fixed md:scale-150 scale-[3.5] h-dvh grayscale dark:hidden flex"
      />
    </main>
  );
}
