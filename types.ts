
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  category: string;
}

export enum GameStatus {
  LANDING = 'LANDING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export interface QuizState {
  currentIndex: number;
  score: number;
  selectedOption: number | null;
  isAnswered: boolean;
  status: GameStatus;
  userAnswers: (number | null)[];
}
