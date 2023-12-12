"use client";

import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

interface Props {
  type: string;
  itemID: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemID,
  userId,
  upvotes: initialUpvotes,
  hasUpvoted: initialHasUpvoted,
  downvotes: initialDownvotes,
  hasDownvoted: initialHasDownvoted,
  hasSaved,
}: Props) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [hasDownvoted, setHasDownvoted] = useState(initialHasDownvoted);

  const handleSave = () => {};

  const handleUpVote = async () => {
    if (!userId) {
      return;
    }

    const params = {
      itemID,
      userId,
      hasUpvoted: true,
      hasDownvoted: false,
    };

    try {
      const res = await axios.post(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/${type}/${itemID}/vote`,
        params
      );
      console.log(res.data);
      console.log("Berhasil Upvote");

      setHasUpvoted(true);
      setHasDownvoted(false);
      setUpvotes(upvotes + 1);
      if (hasDownvoted) {
        setDownvotes(downvotes - 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownVote = async () => {
    if (!userId) {
      return;
    }
    const params = {
      questionID: itemID,
      userID: userId,
      hasUpvoted: false,
      hasDownvoted: true,
    };

    try {
      const res = await axios.post(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/${type}/${itemID}/vote`,
        params
      );
      console.log(res.data);
      console.log("Berhasil Downvote");

      setHasUpvoted(false);
      setHasDownvoted(true);
      setDownvotes(downvotes + 1);
      if (hasUpvoted) {
        setUpvotes(upvotes - 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleUpVote()}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownvoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleDownVote()}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="save"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
