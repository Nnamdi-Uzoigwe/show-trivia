export interface Show {
  _id: string;
  title: string;
  slug: string;
  description: string;
  bannerImage: string;
  posterImage: string;
  genre: string[];
  releaseYear: number;
  totalSeasons: number;
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  isActive: boolean;
}

export interface Question {
  _id: string;
  showId: string;
  showSlug: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface User {
  _id: string;
  name: string;
  fingerprint: string;
  totalQuizzesTaken: number;
  streak: number;
  lastPlayedDate: string;
}

export interface Attempt {
  _id: string;
  userId: string;
  userName: string;
  showId: string;
  showSlug: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  answers: {
    questionId: string;
    selected: number;
    correct: boolean;
  }[];
  completedAt: string;
}

export interface LeaderboardEntry {
  _id: string;
  showSlug: string;
  userId: string;
  userName: string;
  bestScore: number;
  bestTime: number;
  totalAttempts: number;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  timeLeft: number;
  isFinished: boolean;
  score: number;
}