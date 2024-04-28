"use client";
import React, { ReactNode } from "react";
type TButton = {
  children: ReactNode;
};
export default function SelectionButton({ children }: TButton) {
  return (
    <button className="dark:bg-[#3b4d66] bg-[#fff] h-[20px] w-[25vw] z-0 px-5 py-8 flex justify-start items-center gap-5 rounded-lg">
      {children}
    </button>
  );
}
