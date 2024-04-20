import React, { FC } from 'react';

interface CardProps {
  title: string;
  content: string;
  footer: string;
  width?: string;
  height?: string;
}

const PusmasCard: FC<CardProps> = ({ title, content, footer, width, height }) => {
  return (
    <div className={`relative bg-cover bg-center mt-4 ${width} ${height}`}>
      <div className=" bg-[#ffffff] bg-opacity-50 backdrop-blur-md flex flex-col justify-between">
        <div className="text-white text-lg bg-[#3b82f6] border-b-2 border-[#f4f4f4] p-2">{title}</div>
        <div className="text-black text-xs p-2">{content}</div>
        <div className="text-black text-lg bg-[#f3f2f2] p-2">{footer}</div>
      </div>
    </div>
  );
};

export default PusmasCard;