type User = {
  id: string;
  clerkID: string;
  firstName: string;
  lastName: string;
  bio: string;
  picture: string;
  email: string;
  location: string;
  portfolioWebsite: string;
  questions: string[];
  answers: string[];
  isAdmin: boolean;
  reputation: number;
  saved: string[];
  joinedAt: Date;
};

export default User;