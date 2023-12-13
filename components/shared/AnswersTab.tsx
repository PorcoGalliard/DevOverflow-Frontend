"use client"

import Answer from '@/database/answer.model';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NoResult from './NoResult';
import AnswerCard from '../card/AnswerCard';

interface Props {
    clerkID: string;
}

const AnswersTab = ({clerkID}: Props) => {
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        const fetchAnswers = async () => {
            const response = await axios.get(`https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/answer/user/${clerkID}`);
            const mongoAnswers = response.data;
            setAnswers(mongoAnswers);
        }
        fetchAnswers();
    })

    if(!answers) 
    return (
        <div>
          {" "}
          <NoResult
            title="You have answered any questions yet"
            description=" 🚀 Ask a Question and kickstart the
    discussion. our query could be the next big thing others learn from. Get
    involved! 💡"
            link="/"
            linkTitle="Answer Question"
          />
        </div>
      );

  return (
    <>
        {answers.map((answer) => (
            <AnswerCard
            key={answer.id}
            clerkId={clerkID}
            id={answer.id}
            question={answer.question}
            user={answer.user}
            upvotes={answer.upvotes.length}
            createdAt={answer.createdAt}
            />
        ))}
    </>
  )
}

export default AnswersTab