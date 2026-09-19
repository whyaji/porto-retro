export interface QuestionOption {
  id: string; // "A" | "B" | "C" | "D" | "E"
  text: string;
}

export interface Question {
  id: string;
  domainId: number;
  domainTitle: string;
  indicatorId: string;
  indicatorFullId: string; // Unique global identifier e.g. "D1-1.1", "D2-1.1"
  indicatorTitle: string;

  caseStudy: {
    title: string;
    scenario: string;
    contextTags?: string[];
  };
  question: string;
  options: QuestionOption[];
  key: string; // "A" | "B" | "C" | "D" | "E"
  explanation: string;
}

/** Version key — defined by QUESTION_VERSIONS registry in assets/utbk-ukppu/index.ts */
export type QuestionVersion = string;

export interface UserSession {
  userName: string;
  createdAt: string;
  lastUpdated: string;
  selectedAnswers: Record<string, string>; // questionId -> optionId
  flaggedQuestions: Record<string, boolean>; // questionId -> boolean
  timeElapsed: number; // in seconds
  isSubmitted: boolean;
  score?: number;
  currentQuestionIndex?: number;
  questionVersion?: QuestionVersion;
}

