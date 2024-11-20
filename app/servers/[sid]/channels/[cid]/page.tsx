"use client";

import * as Icons from "@/app/components/icons/icons";
import { NextPage } from "next";
import Link from "next/link";
import data from "../../../../../data.json";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface PageProps {
  params: {
    cid: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ChannelIdPage: NextPage<PageProps> = ({ params }) => {
  const [closedCategories, setClosedCategories] = useState<number[]>([]);
  const { cid } = params;

  function toggleCategory(categoryId: number) {
    setClosedCategories((prevClosedCategories) => {
      return prevClosedCategories.includes(categoryId)
        ? prevClosedCategories.filter((id) => id !== categoryId)
        : [...prevClosedCategories, categoryId];
    });
  }

  return (
    <>
      <div className="flex w-60 flex-col bg-zinc-800">
        <button className="flex h-12 items-center px-4 font-title text-[15px] shadow-sm transition hover:bg-zinc-500/[0.16]">
          <div className="relative mr-1 h-4 w-4">
            <Icons.Verified className="absolute h-4 w-4 text-zinc-500" />
            <Icons.Check className="absolute h-4 w-4 text-white" />
          </div>
          Server {cid}
          <Icons.Chevron className="ml-auto h-[18px] w-[18px] opacity-80" />
        </button>
        <div className="hide-scrollbar flex-1 space-y-[21px] overflow-y-scroll pt-3 text-gray-400">
          {data["1"].categories.map((category) => (
            <div key={category.label}>
              {category.label && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center space-x-0.5 px-0.5 font-title text-xs uppercase tracking-wide text-gray-500 hover:text-gray-400"
                >
                  <Icons.Arrow
                    className={`${closedCategories.includes(category.id) ? "-rotate-90" : ""} 'transition ' mr-0.5 h-3 w-3 duration-200`}
                  />
                  {category.label}
                </button>
              )}
              <div className="mt-[5px] space-y-0.5">
                {category.channels
                  .filter((channel) => {
                    const categoryIsOpen = !closedCategories.includes(
                      category.id,
                    );
                    return categoryIsOpen || channel.unread;
                  })
                  .map((channel) => (
                    <ChannelLink
                      key={channel.id}
                      channel={channel}
                      params={params}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-zinc-700">
        <div className="flex h-12 items-center px-3 font-title shadow-sm">
          general
        </div>
        <div className="hide-scrollbar flex-1 space-y-2 overflow-y-scroll p-3">
          {[...Array(40)].map((_, i) => (
            <p key={i}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Corrupti, est enim! Consequatur quaerat fuga labore provident
              veritatis at eligendi voluptatum pariatur, obcaecati excepturi
              sequi blanditiis asperiores enim consectetur repellendus animi!
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChannelIdPage;

export function ChannelLink({ channel, params }) {
  const Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag;
  const isActive = +channel.id === +params.cid;
  let pathname = usePathname();
  pathname = pathname.split("/").slice(0, 3).join("/");

  const state = isActive
    ? "active"
    : channel.unread
      ? "inactiveUnread"
      : "inactiveRead";
  const classes = {
    active:
      "bg-zinc-700/[.5] text-white hover:text-white hover:bg-zinc-700/[.5]",
    inactiveUnread:
      "text-white hover:text-white hover:bg-zinc-700/[.5] active:bg-zinc-700/[.8]",
    inactiveRead: "hover:text-white active:bg-zinc-700/[.8]",
  };

  const linkBaseClasses =
    "group mx-2 flex items-center rounded px-2 py-1 text-gray-400 transition hover:bg-zinc-600/[0.16] hover:text-gray-300 relative";
  return (
    <Link
      className={`${classes[state]} ${linkBaseClasses} `}
      href={`${pathname}/channels/${channel.id}`}
    >
      {state === "inactiveUnread" && (
        <div className="absolute -left-2 h-2 w-1 rounded-r-full bg-white" />
      )}
      <Icon className="mr-1.5 h-5 w-5 text-gray-500" />
      {channel.label}
      <Icons.AddPerson className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 hover:text-gray-200" />
    </Link>
  );
}
