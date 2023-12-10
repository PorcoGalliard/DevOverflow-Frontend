import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
}

const NoResult = ({ title, description }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="no result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />

      <Image
        src="/assets/images/dark-illustration.png"
        alt="no result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_700 text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>

    </div>
  );
};

export default NoResult;
