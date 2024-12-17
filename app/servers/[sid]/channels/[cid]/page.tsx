"use client";

import * as Icons from "@/app/components/icons/icons";
import { NextPage } from "next";
import Link from "next/link";
import { data, IChannel, IMessage } from "../../../../../data";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Message } from "../../../../components/message";
import { MessageWithUser } from "../../../../components/message-with-user";

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
      <div className="hidden w-60 flex-col bg-zinc-800 md:flex">
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
        {/* <div className="hide-scrollbar flex-1 space-y-[21px] overflow-y-scroll pt-3 text-gray-400"> */}
        <div className="scrollbar-hidden flex-1 space-y-[21px] overflow-y-scroll pt-3 text-gray-400">
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
        <ChannelContent channel={channel} />
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
          <div className="mx-2 hidden h-6 w-px bg-white/[.06] md:block" />
          <div className="mx-2 hidden truncate text-sm font-medium text-gray-200 md:block">
            {channel.description}
          </div>
        </>
      )}

      <ChannelActions />
    </div>
  );
}

function ChannelActions() {
  return (
    <>
      {/* Desktop buttons */}
      <div className="ml-auto hidden items-center md:flex">
        <button className="text-gray-200 hover:text-gray-100">
          <Icons.HashtagWithSpeechBubble className="mx-2 h-6 w-6" />
        </button>
        <button className="text-gray-200 hover:text-gray-100">
          <Icons.Bell className="mx-2 h-6 w-6" />
        </button>
        <button className="text-gray-200 hover:text-gray-100">
          <Icons.Pin className="mx-2 h-6 w-6" />
        </button>
        <button className="text-gray-200 hover:text-gray-100">
          <Icons.People className="mx-2 h-6 w-6" />
        </button>
        <div className="relative mx-2">
          <input
            type="search"
            placeholder="Search"
            className="h-6 w-36 rounded border-none bg-gray-800 px-1.5 text-sm font-medium placeholder:text-gray-500"
          />
          <div className="absolute inset-y-0 right-0 mr-1.5 flex items-center">
            <Icons.Spyglass className="h-4 w-4 text-gray-500" />
          </div>
        </div>
        <button className="text-gray-200 hover:text-gray-100">
          <Icons.Inbox className="mx-2 h-6 w-6" />
        </button>
        <button className="text-gray-200 hover:text-gray-100">
          <Icons.QuestionCircle className="mx-2 h-6 w-6" />
        </button>
      </div>
      {/* Mobile buttons */}
      <div className="ml-auto flex items-center md:hidden">
        <button className="text-gray-200 hover:text-gray-100">
          <Icons.HashtagWithSpeechBubble className="mx-2 h-6 w-6" />
        </button>
        <button className="text-gray-200 hover:text-gray-100">
          <Icons.People className="mx-2 h-6 w-6" />
        </button>
      </div>
    </>
  );
}

function ChannelContent({ channel }: { channel: IChannel }) {
  const { messages } = channel;
  return (
    <div className="hide-scrollbar flex-1 overflow-y-scroll">
      {messages.map((message, i) => (
        <div key={message.id}>
          {i === 0 || message.user !== channel.messages[i - 1].user ? (
            <MessageWithUser message={message} />
          ) : (
            <Message message={message} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ChannelIdPage;
