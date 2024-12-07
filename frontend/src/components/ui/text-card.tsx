import React from "react";

type TextCardProps = {
  title: string;
  content: string;
  className: string;
};

const TextCard: React.FC<TextCardProps> = ({ title, content, className }) => {
  return (
    <div className={className + " w-full bg-gray-lighter border rounded-2xl shadow p-10"}>
      <h2 className="text-2xl font-semibold text-gray-dark mb-4">{title}</h2>
      <p className="text-gray-dark leading-relaxed text-lg">{content}</p>
    </div>
  );
};

export default TextCard;
