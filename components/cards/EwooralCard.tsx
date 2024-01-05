import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  tags: string[];
}

const Card: React.FC<CardProps> = ({ title, description, tags }) => {
  return (
    <div className="flex flex-col w-full max-w-sm p-4 mx-auto my-4 rounded-lg shadow-lg dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/vercel.svg" alt="Vercel Logo" width={32} height={32} />
          <div className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 font-semibold text-white bg-gray-900 rounded-full dark:text-gray-100 dark:bg-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default Card;