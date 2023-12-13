"use client";

import QuestionCard from "@/components/card/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Question from "@/database/question.model";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = ({ params }: any) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      // TODO: MASIH ERROR
      const response = await axios.get(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/tag/${params.id}/questions`
      );
      const mongoTags = response.data;
      console.log(mongoTags);
      setQuestions(mongoTags);
    };

    fetchTags();
  }, []);

  console.log(questions);

  if (!questions)
    return (
      <div>
        {" "}
        <NoResult
          title={`There is no question to show`}
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
        <h1 className="h1-bold text-dark100_light900">TAGS TARGET</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearch
          placeholder="Search tag questions..."
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
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
};

export default Page;
