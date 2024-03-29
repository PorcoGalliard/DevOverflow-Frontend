"use client";

import { sidebarLinks } from "@/constants";
import { SignedOut, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const LeftSideBar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <section className="background-light900_dark200 custom-scrollbar light-border shadow-light-300 sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            if (user?.id) {
              item.route = `/profile/${user?.id}`;
            } else {
              return null;
            }
          }

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light-900 rounded-lg"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                height={20}
                width={20}
                className={`${isActive ? " " : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}

        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/account.svg"
                  height={20}
                  width={20}
                  alt="login"
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Log in
                </span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="small-medium light-border-2 text-dark400_light900 btn-tertiary min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/sign-up.svg"
                  height={20}
                  width={20}
                  alt="signup"
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSideBar;
