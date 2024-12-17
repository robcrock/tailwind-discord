import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import NavLink from "./components/nav-link";
import IconDiscord from "./components/icons/icon-discord";
import Image from "next/image";

import { data } from "../data";

const whitney = localFont({
  src: [
    {
      path: "./fonts/whitney/whitney-light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/whitney/whitney-book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/whitney/whitney-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/whitney/whitney-semibold.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-whitney",
});

const ginto = localFont({
  src: [
    {
      path: "./fonts/ginto/ginto-semibold.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ginto",
});

export const metadata: Metadata = {
  title: "Build UI | Discord",
  description: "Discord clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homeIcon = <IconDiscord className="h-[30px] w-[30px]" />;
  return (
    <html lang="en">
      <body
        className={`${whitney.variable} ${ginto.variable} font-whitney antialiased`}
      >
        <div className="flex h-screen text-gray-300">
          <div className="scrollbar-hidden hidden space-y-2 overflow-y-scroll bg-zinc-900 p-3 md:block">
            <NavLink href={"/"}>{homeIcon}</NavLink>
            <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />
            {Object.entries(data).map((entry) => {
              const [id, server] = entry;
              return (
                <NavLink
                  key={id}
                  href={`/servers/${id}/channels/${server.categories[0].channels[0].id}`}
                >
                  <Image width="48" height="48" src={server.src} alt={""} />
                </NavLink>
              );
            })}
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
