import Answer from "@/database/answer.model";
import axios from "axios";
import React, { useState, useEffect } from "react";
import NoResultAnswers from "./NoResultAnswers";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import AnswerVote from "./AnswerVote";

interface Props {
  questionID: string;
  userID?: string;
  clerkID?: string;
  totalAnswers?: number;
}

const AllAnswers = ({ questionID, userID, clerkID, totalAnswers }: Props) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const response = await axios.get(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/question/${questionID}/answers`
      );
      const mongoAnswers = response.data;
      console.log(mongoAnswers);
      setAnswers(mongoAnswers);
    };

    fetchAnswers();
  }, []);

  if (!answers)
    return (
      <div>
        {" "}
        <NoResultAnswers
          title="There is no answers to show"
          description="        Be the first to break the silence! 🚀 Answer the Question kickstart the
discussion. Get
involved! 💡"
        />
      </div>
    );

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient"> {totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {answers.map((answer) => (
          <article key={answer.id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`{/profile/${answer.user.clerkID}}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.user.picture}
                    width={18}
                    height={18}
                    alt="user profile picture"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.user.firstName} {answer.user.lastName}
                    </p>
                    <p className="small-regular text-dark400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      <span className="max-sm:hidden"> -</span>
                      answered {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <AnswerVote
                    answerId={answer.id}
                    userId={clerkID || "Error getting user ID"}
                    upvotes={answer.upvotes.length}
                    hasUpvoted={answer.upvotes.includes(
                      userID || "Error getting user ID"
                    )}
                    downvotes={answer.downvotes.length}
                    hasDownvoted={answer.downvotes.includes(
                      userID || "Error getting user ID"
                    )}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.description} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
