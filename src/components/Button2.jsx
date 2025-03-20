import React from "react";
import { FaDownload } from "react-icons/fa";

const Button2 = (props) => {
  return (
    <div>
      <button class='relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none'>
        <span class='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]'></span>
        <span class='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined'>
          {props.name}
          <FaDownload />
        </span>
      </button>
    </div>
  );
};

export default Button2;
