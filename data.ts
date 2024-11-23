import { format } from "date-fns";
import { faker } from "@faker-js/faker";

faker.seed(123);

export interface IMessage {
  id: number;
  user: string;
  avatarUrl: string;
  date: string; // Format: "MM/dd/yyyy"
  text: string;
}

// The function returns an array of messages
type Messages = IMessage[];

// You can then update your data type to include the messages:
export interface IChannel {
  id: number;
  label: string;
  description?: string;
  icon?: string;
  unread?: boolean;
  messages: Messages;
}

interface Category {
  id: number;
  label: string;
  channels: IChannel[];
}

interface Server {
  label: string;
  src: string;
  categories: Category[];
}

export const data: Record<number, Server> = {
  1: {
    label: "Tailwind CSS",
    src: "/images/tailwind.png",
    categories: [
      {
        id: 1,
        label: "",
        channels: [
          {
            id: 1,
            label: "welcome",
            description:
              "Introduction to the Tailwind CSS framework and community.",
            icon: "Book",
            messages: getMessages(),
          },
          {
            id: 2,
            label: "announcements",
            icon: "Speakerphone",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 2,
        label: "Tailwind CSS",
        channels: [
          {
            id: 3,
            label: "general",
            description:
              "General discussion of Tailwind CSS (please move off-topic discussion in the off-topic channels).",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 4,
            label: "plugins",
            description: "Tailwind CSS plugins.",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 5,
            label: "help",
            description:
              "Help with Tailwind CSS and build process integration.",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 6,
            label: "internals",
            description: "Development of the Tailwind CSS framework itself.",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 3,
        label: "Tailwind Labs",
        channels: [
          {
            id: 7,
            label: "tailwind-ui",
            description: "General discussion of Tailwind UI.",
            messages: getMessages(),
          },
          {
            id: 8,
            label: "headless-ui",
            description: "General discussion of Headless UI.",
            messages: getMessages(),
          },
          {
            id: 9,
            label: "refactoring-ui",
            description: "General discussion of Refactoring UI.",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 10,
            label: "heroicons",
            description: "General discussion of Heroicons.",
            unread: true,
            messages: getMessages(),
          },
        ],
      },
      {
        id: 4,
        label: "Off topic",
        channels: [
          {
            id: 11,
            label: "design",
            description: "General discussion of web design.",
            messages: getMessages(),
          },
          {
            id: 12,
            label: "development",
            description: "General discussion of web development.",
            messages: getMessages(),
          },
          {
            id: 13,
            label: "random",
            description: "General discussion of everything else!",
            unread: true,
            messages: getMessages(),
          },
        ],
      },
      {
        id: 5,
        label: "Community",
        channels: [
          {
            id: 14,
            label: "jobs",
            description:
              "Job board. Please put [HIRING] or [FOR HIRE] at the beginning of your post.",
            messages: getMessages(),
          },
          {
            id: 15,
            label: "showcase",
            description: "Share your projects built with Tailwind CSS!",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 16,
            label: "bots",
            description: "Bot spam containment.",
            messages: getMessages(),
          },
        ],
      },
    ],
  },
  2: {
    label: "Next.js",
    src: "/images/next.png",
    categories: [
      {
        id: 1,
        label: "",
        channels: [
          {
            id: 1,
            label: "welcome",
            icon: "Book",
            messages: getMessages(),
          },
          {
            id: 2,
            label: "announcements",
            icon: "Speakerphone",
            description:
              "Announcements related to this Discord server and Next.js",
            messages: getMessages(),
          },
          {
            id: 3,
            label: "introductions",
            unread: true,
            description:
              "Welcome to the server! Feel free to introduce yourself",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 2,
        label: "Need-Help",
        channels: [
          {
            id: 4,
            label: "community-help",
            description:
              "Members of the community can help each other here, but we recommend checking GitHub discussions first: ",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 3,
        label: "Community",
        channels: [
          {
            id: 5,
            label: "general",
            icon: "HashtagWithSpeechBubble",
            description: "Discussions about Next.js in general",
            messages: getMessages(),
          },
          {
            id: 6,
            label: "off-topic",
            unread: true,
            description:
              "Discussions about topics not related to Next.js or other channels",
            messages: getMessages(),
          },
          {
            id: 7,
            label: "showcase",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 8,
            label: "jobs-board",
            description:
              "Is your company looking for Next.js developers? Discuss here!",
            messages: getMessages(),
          },
          {
            id: 9,
            label: "hire-me",
            unread: true,
            description: "Are you a developer looking to work with Next.js?",
            messages: getMessages(),
          },
          {
            id: 10,
            label: "makers",
            description:
              "Share as you build in public. Welcoming all makers and indie hackers.",
            messages: getMessages(),
          },
          {
            id: 11,
            label: "moderation-feedback",
            description:
              "Discussion about this Discord server and moderation topics",
            messages: getMessages(),
          },
        ],
      },
    ],
  },
  3: {
    label: "Mirage JS",
    src: "/images/mirage.png",
    categories: [
      {
        id: 1,
        label: "Text Channels",
        channels: [
          {
            id: 1,
            label: "general",
            messages: getMessages(),
          },
          {
            id: 2,
            label: "graphql",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 3,
            label: "typescript",
            unread: true,
            messages: getMessages(),
          },
        ],
      },
    ],
  },
};

function getMessages(): IMessage[] {
  return [...Array(faker.number.int({ min: 7, max: 25 }))]
    .map(() => {
      const user = faker.internet.username();
      const avatarUrl = faker.image.avatar();

      return [...Array(faker.number.int({ min: 1, max: 4 }))].map(() => ({
        id: faker.number.int(),
        user,
        avatarUrl,
        date: format(new Date(faker.date.past()), "MM/dd/yyyy"),
        text: faker.lorem.sentences(3),
      }));
    })
    .flat();
}
