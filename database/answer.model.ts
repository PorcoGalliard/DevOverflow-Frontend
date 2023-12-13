import Question from "./question.model";
import User from "./user.model";

type Answer = {
  id: string;
  userID: string;
  user: User
  questionID: string;
  question: Question
  description: string;
  upvotes: string[];
  downvotes: string[];
  createdAt: Date;
};

export default Answer;
