import React from "react";
import { footerBottomItem } from "../../../assets";

function FooterBottom() {
  return (
    <div className="w-full bg-footerBottom py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="w-full grid grid-cols-3 md:grid-cols-5 mdl:grid-cols-6 lgl:grid-cols-8 gap-3 place-content-center text-gray-400">
          {footerBottomItem.map((item) => (
            <div className="group cursor-pointer" key={item._id}>
              <h3 className="w-24 font-semibold text-[12px]  group-hover:underline text-[#ddd] leading-3 mb-[2px]">
                {item.title}
              </h3>
              <p className="w-24 tracking-tight text-[12px] text-[#999] group-hover:underline leading-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
