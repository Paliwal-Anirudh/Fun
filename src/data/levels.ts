import type { Level } from "@/types/game";

export const levels: Level[] = [
  { id: 1, title: "Spark Gate", question: "Which tool is this game built with?", type: "multiple-choice", options: ["Next.js", "Laravel", "Django", "Rails"], answer: "Next.js", points: 100, wrongMessage: "The route-based clue points to Next.js.", successMessage: "Great start! The gate glows open." },
  { id: 2, title: "Memory Meadow", question: "Remember this phrase, then type the missing color: 'The moonlit key is violet.' What color is the key?", type: "memory", answer: "violet", points: 100, wrongMessage: "Replay the sentence in your mind: the key has a royal purple shade.", successMessage: "Your memory is sharp." },
  { id: 3, title: "Crystal Gallery", question: "Choose the symbol that best represents a heart animation.", type: "image-choice", imageOptions: [{ label: "Heart", value: "heart", emoji: "💖" }, { label: "Star", value: "star", emoji: "⭐" }, { label: "Rocket", value: "rocket", emoji: "🚀" }, { label: "Leaf", value: "leaf", emoji: "🍃" }], answer: "heart", points: 100, wrongMessage: "Look for the symbol that literally celebrates love.", successMessage: "The gallery sparkles with hearts." },
  { id: 4, title: "Riddle Bridge", question: "I speak without a mouth and hear without ears. I have nobody, but come alive with wind. What am I?", type: "riddle", answer: ["echo", "an echo"], points: 100, wrongMessage: "It repeats what it hears.", successMessage: "The echo carries you across." },
  { id: 5, title: "Final Vault", question: "What browser storage keeps progress after refresh without a backend?", type: "text", answer: ["localstorage", "local storage"], points: 100, wrongMessage: "It is a Web Storage API available on window.", successMessage: "Vault unlocked. Results await!" },
];

export const maxScore = levels.reduce((total, level) => total + level.points, 0);
export const passingScore = 300;
