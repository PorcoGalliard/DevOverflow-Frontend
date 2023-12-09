import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  user: {
    _id: string;
    clerkID: string;
    picture: string;
    firstName: string;
    lastName: string;
  };
}

const UserCard = ({ user }: Props) => {
  return (
    <>
      <Link
        href={`/profile/${user.clerkID}`}
        className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
      >
        <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
          <Image
            src={user.picture}
            alt="user profile picture"
            height={100}
            width={100}
            className="rounded-full"
          />
          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
                {user.firstName} {user.lastName}
            </h3>
          </div>
        </article>
      </Link>
    </>
  );
};

export default UserCard;
