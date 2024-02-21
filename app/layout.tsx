import { Abyssinica_SIL, Arima } from "next/font/google";
import "./globals.css";

const arima = Arima({ subsets: ["latin"] });
const abyss = Abyssinica_SIL({
  subsets: ["latin"],
  weight: "400",
  variable: "--abyss",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${arima.className} ${abyss.variable}`}>{children}</body>
    </html>
  );
}
