export type Team = "UI" | "Front" | "Back" | "Market";
export type Member = {
  name: string;
  role: string;
  avatar: string;
  done: number; // tasks finished  → the "12" in 12/20
  total: number; // tasks assigned  → the "20"
  isLeader?: boolean; // shows the blue badge
};

export type TeamData = {
  team: Team;
  completed: number;
  members: Member[];
};

const avatar = (n: number) => `https://i.pravatar.cc/64?img=${n}`;

export const teams: TeamData[] = [
  {
    team: "UI",
    completed: 42,
    members: [
      {
        name: "Mohanad wahib",
        role: "Leader",
        avatar: avatar(11),
        done: 12,
        total: 20,
        isLeader: true,
      },
      {
        name: "Mohanad wahib",
        role: "UI Designer",
        avatar: avatar(12),
        done: 9,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "UX Designer",
        avatar: avatar(13),
        done: 14,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "UX Researcher",
        avatar: avatar(14),
        done: 18,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "Product Designer",
        avatar: avatar(15),
        done: 4,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "Visual Designer",
        avatar: avatar(16),
        done: 9,
        total: 20,
      },
    ],
  },
  {
    team: "Front",
    completed: 42,
    members: [
      {
        name: "Mohanad wahib",
        role: "Front Leader",
        avatar: avatar(21),
        done: 12,
        total: 20,
        isLeader: true,
      },
      {
        name: "Mohanad wahib",
        role: "React Dev",
        avatar: avatar(22),
        done: 9,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "Frontend Dev",
        avatar: avatar(23),
        done: 14,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "UI Engineer",
        avatar: avatar(24),
        done: 18,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "Frontend Dev",
        avatar: avatar(25),
        done: 4,
        total: 20,
      },
    ],
  },
  {
    team: "Back",
    completed: 42,
    members: [
      {
        name: "Mohanad wahib",
        role: "Back Leader",
        avatar: avatar(31),
        done: 12,
        total: 20,
        isLeader: true,
      },
      {
        name: "Mohanad wahib",
        role: "Backend Dev",
        avatar: avatar(32),
        done: 9,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "API Engineer",
        avatar: avatar(33),
        done: 14,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "Backend Dev",
        avatar: avatar(34),
        done: 18,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "Database Engineer",
        avatar: avatar(35),
        done: 4,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "Junior Backend",
        avatar: avatar(36),
        done: 9,
        total: 20,
      },
    ],
  },
  {
    team: "Market",
    completed: 42,
    members: [
      {
        name: "Mohanad wahib",
        role: "Marketing Lead",
        avatar: avatar(41),
        done: 12,
        total: 20,
        isLeader: true,
      },
      {
        name: "Mohanad wahib",
        role: "Content Strategist",
        avatar: avatar(42),
        done: 9,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "Growth Specialist",
        avatar: avatar(43),
        done: 14,
        total: 20,
      },
      {
        name: "Mohanad wahib",
        role: "SEO Specialist",
        avatar: avatar(44),
        done: 18,
        total: 20,
      },
    ],
  },
];
