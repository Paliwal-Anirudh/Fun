export type QuestionType = "multiple-choice" | "text" | "image-choice" | "memory" | "riddle";

export type Level = {
  id: number;
  title: string;
  question: string;
  type: QuestionType;
  options?: string[];
  imageOptions?: { label: string; value: string; emoji: string }[];
  image?: string;
  answer: string | string[];
  points: number;
  wrongMessage: string;
  successMessage: string;
  memoryPrompt?: string;
};

export type GameProgress = {
  playerName: string;
  currentLevel: number;
  currentScore: number;
  completedLevels: number[];
  gameFinished: boolean;
  surpriseUnlocked: boolean;
};
