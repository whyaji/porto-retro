import domain1 from "./domain_1.json";
import domain2 from "./domain_2.json";
import domain3 from "./domain_3.json";
import domain4 from "./domain_4.json";
import domain5 from "./domain_5.json";
import domain6 from "./domain_6.json";
import domain7 from "./domain_7.json";
import domain8 from "./domain_8.json";
import domain9 from "./domain_9.json";
import domain10 from "./domain_10.json";
import domain11 from "./domain_11.json";
import domain12 from "./domain_12.json";
import domain13 from "./domain_13.json";
import v2Data from "./v2_questions.json";
import { Question, QuestionVersion } from "@/types/utbk-ukppu";

export const domain1Questions = domain1 as Question[];
export const domain2Questions = domain2 as Question[];
export const domain3Questions = domain3 as Question[];
export const domain4Questions = domain4 as Question[];
export const domain5Questions = domain5 as Question[];
export const domain6Questions = domain6 as Question[];
export const domain7Questions = domain7 as Question[];
export const domain8Questions = domain8 as Question[];
export const domain9Questions = domain9 as Question[];
export const domain10Questions = domain10 as Question[];
export const domain11Questions = domain11 as Question[];
export const domain12Questions = domain12 as Question[];
export const domain13Questions = domain13 as Question[];

export const v1Questions: Question[] = [
  ...domain1Questions,
  ...domain2Questions,
  ...domain3Questions,
  ...domain4Questions,
  ...domain5Questions,
  ...domain6Questions,
  ...domain7Questions,
  ...domain8Questions,
  ...domain9Questions,
  ...domain10Questions,
  ...domain11Questions,
  ...domain12Questions,
  ...domain13Questions,
];

export const v2Questions = v2Data as Question[];

/**
 * Returns questions for the selected version. Default is newest (v2).
 */
export function getQuestionsByVersion(version?: QuestionVersion): Question[] {
  if (version === "v1") {
    return v1Questions;
  }
  return v2Questions;
}

// Default exported allQuestions points to newest (v2)
export const allQuestions: Question[] = v2Questions;

// Map questions by unique indicator full ID e.g. "D1-1.1", "D2-1.2", etc.
export const questionsByIndicator: Record<string, Question[]> = {};

allQuestions.forEach((q) => {
  const fullId = q.indicatorFullId || `D${q.domainId}-${q.indicatorId}`;
  if (!questionsByIndicator[fullId]) {
    questionsByIndicator[fullId] = [];
  }
  questionsByIndicator[fullId].push(q);
});

