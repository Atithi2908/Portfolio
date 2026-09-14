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
      "LeetCode Knight with a contest rating of 1850+, ranking among the top 5% of global competitors in algorithmic problem solving.",
    link: "https://leetcode.com/u/Atithi_jaiman",
    iconName: "Trophy",
  },
  {
    id: "codechef-3star",
    title: "CodeChef 3★ Coder",
    badge: "Competitive Programmer",
    highlight: "1665 Peak Rating",
    description:
      "Achieved CodeChef 3-Star rank with a peak contest rating of 1665, competing in global algorithmic programming challenges.",
    link: "https://leetcode.com/u/Atithi_jaiman",
    iconName: "Flame",
  },
  {
    id: "aws-educate",
    title: "AWS Educate Certified",
    badge: "Cloud Certification",
    highlight: "Cloud 101 Certified",
    description:
      "Certified in AWS Educate Cloud 101, validating foundational knowledge in cloud computing, AWS architecture, and infrastructure management.",
    iconName: "Cloud",
  },
];
