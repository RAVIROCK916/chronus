import { BarChart3Icon, FolderOpenIcon, WandSparklesIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL =
  "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
  {
    name: "Asana",
    logo: "/assets/company-01.svg",
  },
  {
    name: "Tidal",
    logo: "/assets/company-02.svg",
  },
  {
    name: "Innovaccer",
    logo: "/assets/company-03.svg",
  },
  {
    name: "Linear",
    logo: "/assets/company-04.svg",
  },
  {
    name: "Raycast",
    logo: "/assets/company-05.svg",
  },
  {
    name: "Labelbox",
    logo: "/assets/company-06.svg",
  },
] as const;

export const PROCESS = [
  {
    title: "Organize Your Tasks",
    description:
      "Efficiently categorize and tag your tasks for quick access and easy management.",
    icon: FolderOpenIcon,
  },
  {
    title: "Create Branded Tasks",
    description:
      "Create concise, branded tasks that are easy to share and track.",
    icon: WandSparklesIcon,
  },
  {
    title: "Analyze and Optimize",
    description:
      "Gain insights into task performance and optimize for better engagement.",
    icon: BarChart3Icon,
  },
] as const;

export const FEATURES = [
  {
    title: "Link shortening",
    description: "Create short tasks that are easy to remember and share.",
  },
  {
    title: "Advanced analytics",
    description: "Track and measure the performance of your tasks.",
  },
  {
    title: "Password protection",
    description: "Secure your tasks with a password.",
  },
  {
    title: "Custom QR codes",
    description: "Generate custom QR codes for your tasks.",
  },
  {
    title: "Link expiration",
    description: "Set an expiration date for your tasks.",
  },
  {
    title: "Team collaboration",
    description: "Share tasks with your team and collaborate in real-time.",
  },
] as const;

export const REVIEWS = [
  {
    name: "Michael Smith",
    username: "@michaelsmith",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    review:
      "This tool is a lifesaver! Managing and tracking my tasks has never been easier. A must-have for anyone dealing with numerous tasks.",
  },
  {
    name: "Emily Johnson",
    username: "@emilyjohnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 4,
    review:
      "Very useful app! It has streamlined my workflow considerably. A few minor bugs, but overall a great experience.",
  },
  {
    name: "Daniel Williams",
    username: "@danielwilliams",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    review:
      "I've been using this app daily for months. The insights and analytics it provides are invaluable. Highly recommend it!",
  },
  {
    name: "Sophia Brown",
    username: "@sophiabrown",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    review:
      "This app is fantastic! It offers everything I need to manage my tasks efficiently.",
  },
  {
    name: "James Taylor",
    username: "@jamestaylor",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    review:
      "Absolutely love this app! It's intuitive and feature-rich. Has significantly improved how I manage and track tasks.",
  },
  {
    name: "Olivia Martinez",
    username: "@oliviamartinez",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4,
    review:
      "Great app with a lot of potential. It has already saved me a lot of time. Looking forward to future updates and improvements.",
  },
  {
    name: "William Garcia",
    username: "@williamgarcia",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    review:
      "This app is a game-changer for task management. It's easy to use, extremely powerful and highly recommended!",
  },
  {
    name: "Mia Rodriguez",
    username: "@miarodriguez",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 4,
    review:
      "I've tried several task management tools, but this one stands out. It's simple, effective.",
  },
  {
    name: "Henry Lee",
    username: "@henrylee",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 5,
    review:
      "This app has transformed my workflow. Managing and analyzing tasks is now a breeze. I can't imagine working without it.",
  },
] as const;
