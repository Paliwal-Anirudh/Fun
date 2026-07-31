import { levels, maxScore, passingScore } from "@/data/levels";
import type { GameProgress, Level } from "@/types/game";

export const storageKey = "fun-game-progress";
export const initialProgress: GameProgress = { playerName: "", currentLevel: 1, currentScore: 0, completedLevels: [], gameFinished: false, surpriseUnlocked: false };

const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

export function checkAnswer(level: Level, answer: string) {
  const answers = Array.isArray(level.answer) ? level.answer : [level.answer];
  return answers.some((item) => normalize(item) === normalize(answer));
}

export function calculateScore(progress: GameProgress, level: Level, correct: boolean) {
  if (!correct || progress.completedLevels.includes(level.id)) return progress.currentScore;
  return progress.currentScore + level.points;
}

export function unlockNextLevel(progress: GameProgress, levelId: number): GameProgress {
  const completedLevels = Array.from(new Set([...progress.completedLevels, levelId])).sort((a, b) => a - b);
  const finalLevel = levelId === levels.length;
  const currentLevel = finalLevel ? levelId : Math.max(progress.currentLevel, levelId + 1);
  const gameFinished = finalLevel && completedLevels.length === levels.length;
  return { ...progress, completedLevels, currentLevel, gameFinished, surpriseUnlocked: gameFinished && progress.currentScore >= passingScore };
}

export function scorePercentage(score: number) {
  return Math.round((score / maxScore) * 100);
}

export function canAccessLevel(progress: GameProgress, levelId: number) {
  return Boolean(progress.playerName) && levelId >= 1 && levelId <= levels.length && levelId <= progress.currentLevel;
}

export function sanitizeProgress(value: unknown): GameProgress {
  if (!value || typeof value !== "object") return initialProgress;
  const parsed = value as Partial<GameProgress>;
  return {
    playerName: typeof parsed.playerName === "string" ? parsed.playerName : "",
    currentLevel: typeof parsed.currentLevel === "number" ? Math.min(Math.max(parsed.currentLevel, 1), levels.length) : 1,
    currentScore: typeof parsed.currentScore === "number" ? Math.min(Math.max(parsed.currentScore, 0), maxScore) : 0,
    completedLevels: Array.isArray(parsed.completedLevels) ? parsed.completedLevels.filter((id) => Number.isInteger(id) && id >= 1 && id <= levels.length) : [],
    gameFinished: Boolean(parsed.gameFinished),
    surpriseUnlocked: Boolean(parsed.surpriseUnlocked),
  };
}

export function loadProgress() {
  if (typeof window === "undefined") return initialProgress;
  try {
    return sanitizeProgress(JSON.parse(window.localStorage.getItem(storageKey) ?? "null"));
  } catch {
    return initialProgress;
  }
}

export function saveProgress(progress: GameProgress) {
  if (typeof window !== "undefined") window.localStorage.setItem(storageKey, JSON.stringify(progress));
}

export function resetGame() {
  if (typeof window !== "undefined") window.localStorage.removeItem(storageKey);
  return initialProgress;
}
