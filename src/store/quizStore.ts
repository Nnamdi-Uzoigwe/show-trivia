import { create } from "zustand";
import { Question } from "@/types";

interface QuizStore {
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  timeLeft: number;
  isFinished: boolean;
  isStarted: boolean;
  showSlug: string | null;
  showTitle: string | null;

  setQuestions: (questions: Question[], showSlug: string, showTitle: string) => void;
  answerQuestion: (index: number, answer: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setTimeLeft: (time: number) => void;
  finishQuiz: () => void;
  resetQuiz: () => void;

  getScore: () => number;
  getResults: () => { questionId: string; selected: number; correct: boolean }[];
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  questions: [],
  currentIndex: 0,
  answers: [],
  timeLeft: 30 * 60,
  isFinished: false,
  isStarted: false,
  showSlug: null,
  showTitle: null,

  setQuestions: (questions, showSlug, showTitle) =>
    set({
      questions,
      showSlug,
      showTitle,
      answers: new Array(questions.length).fill(null),
      currentIndex: 0,
      timeLeft: 30 * 60,
      isFinished: false,
      isStarted: true,
    }),

  answerQuestion: (index, answer) =>
    set((state) => {
      const answers = [...state.answers];
      answers[index] = answer;
      return { answers };
    }),

  nextQuestion: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
    })),

  prevQuestion: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
    })),

  setTimeLeft: (time) => set({ timeLeft: time }),

  finishQuiz: () => set({ isFinished: true, isStarted: false }),

  resetQuiz: () =>
    set({
      questions: [],
      currentIndex: 0,
      answers: [],
      timeLeft: 30 * 60,
      isFinished: false,
      isStarted: false,
      showSlug: null,
      showTitle: null,
    }),

getScore: () => {
  const { questions, answers } = get();
  return answers.reduce<number>((acc, answer, i) => {
    return answer === questions[i]?.correctAnswer ? acc + 1 : acc;
  }, 0);
},
  getResults: () => {
    const { questions, answers } = get();
    return questions.map((q, i) => ({
      questionId: q._id,
      selected: answers[i] ?? -1,
      correct: answers[i] === q.correctAnswer,
    }));
  },
}));