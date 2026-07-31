export type Level = {
  id: number;
  title: string;
  prompt: string;
  kind: "multiple-choice" | "text";
  options?: string[];
  answer: string;
  hint: string;
};

export const levels: Level[] = [
  { id: 1, title: "The Warm-Up Gate", prompt: "Which framework powers this App Router adventure?", kind: "multiple-choice", options: ["Next.js", "Angular", "Svelte", "Rails"], answer: "Next.js", hint: "It is optimized for Vercel deployments." },
  { id: 2, title: "Type Valley", prompt: "What language adds static types to JavaScript?", kind: "text", answer: "typescript", hint: "It ends with Script." },
  { id: 3, title: "Style Summit", prompt: "Which utility-first CSS framework styles this game?", kind: "multiple-choice", options: ["Bootstrap", "Tailwind CSS", "Bulma", "Foundation"], answer: "Tailwind CSS", hint: "Utilities like flex, grid, and rounded-xl are clues." },
  { id: 4, title: "Storage Cave", prompt: "Which browser API keeps your name, level, and score after refresh?", kind: "text", answer: "localstorage", hint: "One word, no space needed." },
  { id: 5, title: "Final Portal", prompt: "What minimum score unlocks the surprise page?", kind: "multiple-choice", options: ["50%", "60%", "70%", "100%"], answer: "70%", hint: "A strong passing score." },
];

export const passingPercent = 70;
export const storageKey = "quest-of-five-state";
