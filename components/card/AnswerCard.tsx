import Link from "next/link";

import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

interface Props {
  clerkId?: string | null;
  id: string;
  question: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    clerkID: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  id,
  question,
  user,
  upvotes,
  createdAt,
}: Props) => {

  return (
    <Link
      href={`/question/${question.id}/#${id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={user.picture}
          alt="user avatar"
          value={user.firstName + " " + user.lastName}
          title={` • asked ${getTimestamp(createdAt)}`}
          href={`/profile/${user.clerkID}`}
          textStyles="body-medium text-dark400_light700"
          isUser
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;