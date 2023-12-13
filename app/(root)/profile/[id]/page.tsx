"use client"

import { Button } from "@/components/ui/button";
import { SignedIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import User from "@/database/user.model";
import axios from "axios";
import ProfileLink from "@/components/shared/ProfileLink";
import { getJoinedDate } from "@/lib/utils";
import Stats from "@/components/shared/Stats";
import NoResult from "@/components/shared/NoResult";
import QuestionsTab from "@/components/shared/QuestionsTab";
import AnswersTab from "@/components/shared/AnswersTab";

const Page = ({ params }: any) => {
  const { user: clerkID } = useUser();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/user/${params.id}`
      );
      const mongoUser = response.data;
      console.log(mongoUser);
      setUser(mongoUser);
    };

    fetchUser();
  }, [params.id]);

  if (!user)
  return (
    <div>
      {" "}
      <NoResult
        title="You are not logged in yet"
        description="        Be the first to break the silence! 🚀 Ask a Question and kickstart the
discussion. our query could be the next big thing others learn from. Get
involved! 💡"
        link="/sign-in"
        linkTitle="Sign In"
      />
    </div>
  );

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user?.picture ?? ""}
            alt="user profile"
            width={14}
            height={14}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {user?.firstName} {user?.lastName}
            </h2>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user?.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user?.portfolioWebsite}
                  title="Portfolio Website"
                />
              )}

              {user?.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user?.location}
                />
              )}

              {user?.joinedAt && (
                <ProfileLink
                  imgUrl="/assets/icons/calendar.svg"
                  title={getJoinedDate(user?.joinedAt)}
                />
              )}

              {user?.bio && (
                <ProfileLink imgUrl="/assets/icons/bio.svg" title={user?.bio} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkID?.id === user?.clerkID && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        totalQuestions={user?.questions.length}
        totalAnswers={user?.answers.length}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="w-[400px]">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Top Posts">
            <QuestionsTab clerkID={params.id}/>
            QUESTIONTAB
          </TabsContent>
          <TabsContent value="Answers">
            <AnswersTab clerkID={params.id}/>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
