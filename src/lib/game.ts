import { levels, type Level } from "./levels";

export type GameState = {
  playerName: string;
  currentLevel: number;
  score: number;
  completed: boolean;
  unlockedSurprise: boolean;
};

export const initialGameState: GameState = {
  playerName: "",
  currentLevel: 0,
  score: 0,
  completed: false,
  unlockedSurprise: false,
};

export function normalizeAnswer(answer: string) {
  return answer.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isCorrect(level: Level, answer: string) {
  return normalizeAnswer(level.answer) === normalizeAnswer(answer);
}

export function scorePercent(score: number) {
  return Math.round((score / levels.length) * 100);
}
