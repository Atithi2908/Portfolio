export interface Achievement {
  id: string;
  title: string;
  badge: string;
  highlight: string;
  description: string;
  link?: string;
  iconName: string;
}

export const achievementsData: Achievement[] = [
  {
    id: "leetcode-knight",
    title: "LeetCode Knight",
    badge: "Top 5% Globally",
    highlight: "1850+ Contest Rating",
    description:
      "Achieved Knight status with 1850+ contest rating in global LeetCode rounds, mastering complex graph algorithms, dynamic programming, and high-speed problem decomposition.",
    link: "https://leetcode.com/u/Atithi_jaiman",
    iconName: "Trophy",
  },
  {
    id: "codechef-4star",
    title: "CodeChef 4★ Coder",
    badge: "Competitive Programmer",
    highlight: "4-Star Competitive Rating",
    description:
      "Achieved 4-Star rank on CodeChef, competing in timed global rounds covering number theory, combinatorial optimization, dynamic programming, and graph algorithms.",
    link: "https://www.codechef.com/users/atithijaiman",
    iconName: "Flame",
  },
  {
    id: "dsa-800-solved",
    title: "800+ DSA Questions Solved",
    badge: "Algorithmic Rigor",
    highlight: "800+ Problems Solved",
    description:
      "Solved 800+ data structures & algorithms problems across LeetCode, CodeChef, and GeeksforGeeks spanning binary trees, graph traversals, segment trees, and system design algorithms.",
    link: "https://leetcode.com/u/Atithi_jaiman",
    iconName: "Code2",
  },
];
