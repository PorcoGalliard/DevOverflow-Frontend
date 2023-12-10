import User from "./user.model";

type Answer = {
  id: string;
  userID: string;
  user: User
  questionID: string;
  description: string;
  upvotes: string[];
  downvotes: string[];
  createdAt: Date;
};

export default Answer;
