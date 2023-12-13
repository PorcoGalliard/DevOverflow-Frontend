import Question from "./question.model";
import User from "./user.model";

type Tag = {
  id: string;
  description: string;
  name: string;
  questions: string[];
  questionDetails: Question[]
  followers: string[];
  followersDetails: User[];
  createdAt: string;
};

export default Tag;
