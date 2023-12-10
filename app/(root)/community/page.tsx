"use client";

import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import React, { useState, useEffect } from "react";
import Filter from "@/components/shared/Filter";
import User from "@/database/user.model";
import axios from "axios";
import NoResult from "@/components/shared/NoResult";
import UserCard from "@/components/card/UserCard";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/user"
      );
      const mongoUsers = response.data;
      console.log(mongoUsers);
      setUsers(mongoUsers);
    };

    fetchUsers();
  }, []);

  if (!users)
    return (
      <div>
        {" "}
        <NoResult
          title="There is no user to show"
          description="        Be the first to break the silence! 🚀 Register yourself Ask a Question and kickstart the
discussion. our query could be the next big thing others learn from. Get
involved! 💡"
          link="/sign-up"
          linkTitle="Sign-up"
        />
      </div>
    );
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearch
          placeholder="Search for amazing minds"
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          // containerClasses="hidden max-md:flex"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </>
  );
};

export default Page;
