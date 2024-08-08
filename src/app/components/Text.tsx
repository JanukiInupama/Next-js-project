"use client";

import React from 'react';

type TextProps = {
  content: string;
  mobileNote?: string;
};

const Text: React.FC<TextProps> = ({ content, mobileNote }) => {
  return (
    <div className="max-w-6xl mx-auto my-2 md:my-8">
      <div className="px-6 md:px-4 py-2 md:py-6 bg-purple-300 shadow-md">
        <p className="text-base md:text-justify text-gray-800">{content}</p>
      </div>
      {mobileNote && (
        <p className="mt-6 px-6 text-justify text-gray-600 md:hidden">
          {mobileNote}
        </p>
      )}
    </div>
  );
};

export default Text;