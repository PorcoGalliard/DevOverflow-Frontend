"use client";

import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import NoResult from "@/components/shared/NoResult";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Page = ({ params }: any) => {
  const { user } = useUser();
  const router = useRouter();
  const [appUser, setAppUser] = useState<User>();
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    if (!user?.id) router.push("/sign-in");

    const fetchUser = async () => {
      const response = await axios.get(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/user/${user?.id}`
      );
      const mongoUser = response.data;
      // console.log(mongoUser);
      setAppUser(mongoUser);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await axios.get(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/question/${params.id}`
      );
      const mongoQuestion = response.data;
      console.log(mongoQuestion);
      setQuestion(mongoQuestion);
    };

    fetchQuestion();
  }, []);

  if (!question)
    return (
      <div>
        {" "}
        <NoResult
          title="The question you are looking for does not exist"
          description="Let's go back to the home page and start look another great question 🚀"
          link="/"
          linkTitle="Home"
        />
      </div>
    );

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`profile/${question.user.clerkID}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.user.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="user profile picture"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.user.firstName} {question.user.lastName}
            </p>
          </Link>

          <div className="flex justify-end">
            <Votes
              type="question"
              itemID={question.id}
              userId={appUser?.clerkID || "Error getting user ID"}
              upvotes={question.upvotes.length}
              hasUpvoted={question.upvotes.includes(
                appUser?.id || "Error getting user ID"
              )}
              downvotes={question.downvotes.length}
              hasDownvoted={question.downvotes.includes(
                appUser?.id || "Error getting user ID"
              )}
              hasSaved={appUser?.saved.includes(
                appUser?.id || "Error getting user ID"
              )}
            />
          </div>
        </div>

        <div>
          <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
            {question.title}
          </h2>
        </div>

        <div className="mb-8 mt-5 flex flex-wrap gap-4 ">
          <Metric
            imgUrl="/assets/icons/clock.svg"
            alt="clock icon"
            value={` asked ${getTimestamp(question.createdAt)}`}
            title=" - Asked"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={`${formatAndDivideNumber(question.answers.length)}`}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="views"
            value={`${formatAndDivideNumber(question.views)}`}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>

      <ParseHTML data={question.description} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tagDetails.map((tag: any) => (
          <RenderTag
            key={tag.id}
            _id={tag.id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionID={question.id}
        userID={appUser?.id}
        totalAnswers={question.answers.length}
      />

      <Answer questionID={question.id} userID={appUser?.id} />
    </>
  );
};

export default Page;
