import { HomeIcon, NotebookIcon } from "lucide-react";
import { Icons } from "@/components/icons";
export const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "apsingh5377@gmail.com",
    tel: "+918437885001",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/amritpal7",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/amritpal-singh-6939a0aa/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },
};
