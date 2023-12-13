"use client"

import Question from '@/database/question.model';
import React, { useEffect, useState } from 'react'
import NoResult from './NoResult';
import QuestionCard from '../card/QuestionCard';
import axios from 'axios';

interface Props {
    clerkID: string;
}

const QuestionsTab = ({clerkID}: Props) => {

    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get(`https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/question/user/${clerkID}`);
            const mongoQuestions = response.data;
            setQuestions(mongoQuestions);
        }
        fetchQuestions();
    }, [clerkID])

    if (!questions)
    return (
        <div>
          {" "}
          <NoResult
            title="You have no questions"
            description=" 🚀 Ask a Question and kickstart the
    discussion. our query could be the next big thing others learn from. Get
    involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        </div>
      );

  return (
    <>
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
    </>
  )
}

export default QuestionsTab;