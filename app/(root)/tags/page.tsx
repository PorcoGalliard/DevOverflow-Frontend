"use client";

import { useState, useEffect } from "react";
import Tag from "@/database/tag.model";
import axios from "axios";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filters";
import Link from "next/link";

const Page = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await axios.get(
        "https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/tag"
      );
      const mongoTags = response.data;
      console.log(mongoTags);
      setTags(mongoTags);
    };

    fetchTags();
  }, []);

  if (!tags)
    return (
      <div>
        {" "}
        <NoResult
          title="There is no tags to show"
          description="        Be the first to break the silence! 🚀 Register yourself Ask a Question and kickstart the
discussion. our query could be the next big thing others learn from. Get
involved! 💡"
          link="/ask-question"
          linkTitle="ask-question"
        />
      </div>
    );
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearch
          placeholder="Search for tags"
          route="/tag"
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
        {tags.map((tag) => (
          <Link
            href={`/tags/${tag.id}`}
            key={tag.id}
            className="shadow-light100_darknone"
          >
            <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
              <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                <p className="paragraph-semibold text-dark300_light900 ">
                  {tag.name}
                </p>
              </div>
              <p className="small-medium text-dark400_light500 mt-3.5">
                <span className="body-semibold primary-text-gradient mr-2.5">
                  {tag.questions.length}+
                </span>{" "}
                Questions
              </p>
            </article>
          </Link>
        ))}
      </section>
    </>
  );
};

export default Page;
