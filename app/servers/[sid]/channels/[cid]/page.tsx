"use client";

import * as Icons from "@/app/components/icons/icons";
import { NextPage } from "next";
import Link from "next/link";
import { data } from "../../../../../data";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Add proper TypeScript interfaces
interface Channel {
  id: number;
  label: string;
  description?: string;
  icon?: string;
  unread?: boolean;
  messages: any[]; // Replace 'any' with proper message type if available
}

interface Category {
  id: number;
  label: string;
  channels: Channel[];
}

interface Server {
  label: string;
  categories: Category[];
}

interface PageProps {
  params: {
    cid: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ChannelIdPage: NextPage<PageProps> = ({ params }) => {
  // Get server info from URL
  const pathname = usePathname();
  const serverId = parseInt(pathname.split("/")[2]);
  const channelId = parseInt(params.cid);

  // State for collapsible categories
  const [closedCategories, setClosedCategories] = useState<number[]>([]);

  // Get current server data
  const server = data[serverId];
  if (!server) return <div>Server not found</div>;

  // Get current channel data
  const channel = server.categories
    .flatMap((category) => category.channels)
    .find((channel) => channel.id === channelId);
  if (!channel) return <div>Channel not found</div>;

  return (
    <>
      {/* Server Sidebar */}
      <div className="flex w-60 flex-col bg-zinc-800">
        {/* Server Header */}
        <button className="flex h-12 items-center px-4 font-title text-[15px] shadow-sm transition hover:bg-zinc-500/[0.16]">
          <div className="relative mr-1 h-4 w-4">
            <Icons.Verified className="absolute h-4 w-4 text-zinc-500" />
            <Icons.Check className="absolute h-4 w-4 text-white" />
          </div>
          {server.label}
          <Icons.Chevron className="ml-auto h-[18px] w-[18px] opacity-80" />
        </button>

        {/* Channel List */}
        <div className="hide-scrollbar flex-1 space-y-[21px] overflow-y-scroll pt-3 text-gray-400">
          {server.categories.map((category) => (
            <div key={category.label}>
              {category.label && (
                <CategoryHeader
                  category={category}
                  isClosed={closedCategories.includes(category.id)}
                  onToggle={() => {
                    setClosedCategories((prev) =>
                      prev.includes(category.id)
                        ? prev.filter((id) => id !== category.id)
                        : [...prev, category.id],
                    );
                  }}
                />
              )}
              <div className="mt-[5px] space-y-0.5">
                {category.channels
                  .filter(
                    (channel) =>
                      !closedCategories.includes(category.id) || channel.unread,
                  )
                  .map((channel) => (
                    <ChannelLink
                      key={channel.id}
                      channel={channel}
                      currentChannelId={channelId}
                      basePath={`/servers/${serverId}`}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Channel Content */}
      <div className="flex min-w-0 flex-1 flex-shrink flex-col bg-zinc-700">
        <ChannelHeader channel={channel} />
        <ChannelContent />
      </div>
    </>
  );
};

// Split into smaller components for better organization
function CategoryHeader({
  category,
  isClosed,
  onToggle,
}: {
  category: Category;
  isClosed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center space-x-0.5 px-0.5 font-title text-xs uppercase tracking-wide text-gray-500 hover:text-gray-400"
    >
      <Icons.Arrow
        className={`${isClosed ? "-rotate-90" : ""} mr-0.5 h-3 w-3 transition duration-200`}
      />
      {category.label}
    </button>
  );
}

function ChannelLink({
  channel,
  currentChannelId,
  basePath,
}: {
  channel: Channel;
  currentChannelId: number;
  basePath: string;
}) {
  const Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag;
  const isActive = channel.id === currentChannelId;

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

  return (
    <Link
      className={`${classes[state]} group relative mx-2 flex items-center rounded px-2 py-1 text-gray-400 transition hover:bg-zinc-600/[0.16] hover:text-gray-300`}
      href={`${basePath}/channels/${channel.id}`}
    >
      {channel.unread && !isActive && (
        <div className="absolute -left-2 h-2 w-1 rounded-r-full bg-white" />
      )}
      <Icon className="mr-1.5 h-5 w-5 text-gray-500" />
      {channel.label}
      <Icons.AddPerson className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 hover:text-gray-200" />
    </Link>
  );
}

function ChannelHeader({ channel }: { channel: Channel }) {
  return (
    <div className="flex h-12 items-center px-2 font-title shadow-sm">
      <div className="flex items-center">
        <Icons.Hashtag className="mx-2 h-6 w-6 font-semibold text-gray-400" />
        <span className="mr-2 whitespace-nowrap font-title text-white">
          {channel.label}
        </span>
      </div>

      {channel.description && (
        <>
          <div className="mx-2 h-6 w-px bg-white/[.06]" />
          <div className="mx-2 truncate text-sm font-medium text-gray-200">
            {channel.description}
          </div>
        </>
      )}

      <ChannelActions />
    </div>
  );
}

function ChannelActions() {
  const actions = [
    { Icon: Icons.HashtagWithSpeechBubble },
    { Icon: Icons.Bell },
    { Icon: Icons.Pin },
    { Icon: Icons.People },
    { Icon: Icons.Inbox },
    { Icon: Icons.QuestionCircle },
  ];

  return (
    <div className="ml-auto flex items-center">
      {actions.map(({ Icon }, i) => (
        <button key={i} className="text-gray-200 hover:text-gray-100">
          <Icon className="mx-2 h-6 w-6" />
        </button>
      ))}
    </div>
  );
}

function ChannelContent() {
  return (
    <div className="hide-scrollbar flex-1 space-y-2 overflow-y-scroll p-3">
      {[...Array(40)].map((_, i) => (
        <p key={i}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
          est enim! Consequatur quaerat fuga labore provident veritatis at
          eligendi voluptatum pariatur, obcaecati excepturi sequi blanditiis
          asperiores enim consectetur repellendus animi!
        </p>
      ))}
    </div>
  );
}

export default ChannelIdPage;
