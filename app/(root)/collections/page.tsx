"use client";

import QuestionCard from "@/components/card/QuestionCard";
import Question from "@/database/question.model";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Props {
  Page: number;
  Limit: number;
  searchQuery: string;
}

export default function Page({ Page, Limit, searchQuery }: Props) {
  const router = useRouter();

  const { user } = useUser();

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!user?.id) router.push("/sign-in");

    const fetchQuestions = async () => {
      const response = await axios.get(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/user/${user?.id}/saved-questions}`
      );
      const mongoQuestions = response.data;
      console.log(mongoQuestions);
      setQuestions(mongoQuestions);
    };

    fetchQuestions();
  }, []);

  if (!questions)
    return (
      <div>
        {" "}
        <NoResult
          title="There is no saved question to show"
          description="        Be the first to break the silence! 🚀 Ask a Question and kickstart the
discussion. our query could be the next big thing others learn from. Get
involved! 💡"
          link="/ask-question"
          linkTitle="Ask a Question"
        />
      </div>
    );

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearch
          placeholder="Search questions..."
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            _id={question.id}
            user={question.user}
            title={question.title}
            tags={question.tagDetails}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))}
      </div>
    </>
  );
}
