import { faker } from "@faker-js/faker";

faker.seed(123);

export const data = {
  1: {
    label: "Tailwind CSS",
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
    ],
  },
  2: {
    label: "Next.js",
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
        ],
      },
    ],
  },
  3: {
    label: "Mirage JS",
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getMessages() {
  return [...Array(getRandomInt(7, 25))]
    .map(() => {
      let user = faker.internet.username();
      let avatarUrl = faker.image.avatar();

      return [...Array(getRandomInt(1, 4))].map(() => ({
        user,
        avatarUrl,
        date: "01/15/2021",
        text: faker.lorem.sentences(3),
      }));
    })
    .flat();
}
