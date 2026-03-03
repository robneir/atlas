export const ERA_CONFIG = {
  ancient: { label: "Ancient", color: "#8b6914", range: [-10000, -500] },
  classical: { label: "Classical", color: "#cd853f", range: [-500, 500] },
  medieval: { label: "Medieval", color: "#8b7355", range: [500, 1400] },
  renaissance: { label: "Renaissance", color: "#6b8e6b", range: [1400, 1600] },
  enlightenment: {
    label: "Enlightenment",
    color: "#7b9eb8",
    range: [1600, 1800],
  },
  modern: { label: "Modern", color: "#8fa4c4", range: [1800, 1945] },
  contemporary: {
    label: "Contemporary",
    color: "#b088c4",
    range: [1945, 2025],
  },
} as const;
