"use client";

import Question from "@/components/forms/Question";
import User from "@/database/user.model";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const router = useRouter();

  const { user } = useUser();

  const [appUser, setAppUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user?.id) router.push("/sign-in");

    const fetchUser = async () => {
      const response = await axios.get(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/user/${user?.id}`
      );
      const mongoUser = response.data;
      console.log(mongoUser);
      setAppUser(mongoUser);
    };

    fetchUser();
  }, []);

  if (!appUser) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(user?.id)} />
      </div>
    </div>
  );
};

export default Page;
