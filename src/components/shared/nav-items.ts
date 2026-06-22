export type NavItem = {
  label: string;
  to: string;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Projects", to: "/projects" },
  { label: "Tasks", to: "/tasks" },
  { label: "Chats", to: "/chats" },
  { label: "Meetings", to: "/meetings" },
  { label: "Reports", to: "/reports" },
];
