import React from "react";
import KeyBoardArrowRightIcon from "@mui/icons-material/KeyBoardArrowRight";
const SideNavContent = ({ title, one, two, three, onClickThree }) => {
  return (
    <div>
      <div className=" pb-4  border-b-[1px] border-b-gray-300">
        <h3 className="text-lg font-titlFont font-semibold mb-1 py-2 px-6">
          {title}
        </h3>
        <ul className="text-sm">
          <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2  cursor-pointer">
            {one}
            <KeyBoardArrowRightIcon />
          </li>
          <li className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2  cursor-pointer">
            {two}
            <KeyBoardArrowRightIcon />
          </li>
          <li
            onClick={onClickThree}
            className="flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer"
          >
            {three}
            <KeyBoardArrowRightIcon />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavContent;
