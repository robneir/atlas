import type { Milestone } from "./types";

export const MILESTONES: Milestone[] = [
  { id: "first-vote", label: "First Vote", description: "Cast your first vote", icon: "ArrowUp", threshold: 1, field: "votesCast" },
  { id: "100-votes", label: "Century Voter", description: "Cast 100 votes", icon: "ArrowUp", threshold: 100, field: "votesCast" },
  { id: "first-star", label: "First Star", description: "Star your first item", icon: "Star", threshold: 1, field: "starsReceived" },
  { id: "50-stars", label: "Star Collector", description: "Receive 50 stars", icon: "Star", threshold: 50, field: "starsReceived" },
  { id: "10-day-streak", label: "On a Roll", description: "10-day contribution streak", icon: "Flame", threshold: 10, field: "currentStreak" },
  { id: "30-day-streak", label: "Dedicated", description: "30-day contribution streak", icon: "Flame", threshold: 30, field: "currentStreak" },
  { id: "first-chronicle", label: "First Chronicle", description: "Create your first chronicle", icon: "BookOpen", threshold: 1, field: "chroniclesCreated" },
  { id: "5-chronicles", label: "Storyteller", description: "Create 5 chronicles", icon: "BookOpen", threshold: 5, field: "chroniclesCreated" },
  { id: "contributor", label: "Contributor", description: "Reach Contributor tier", icon: "Award" },
  { id: "historian", label: "Verified Historian", description: "Reach Verified Historian tier", icon: "Shield" },
];
