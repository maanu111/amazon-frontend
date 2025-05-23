import React from "react";
import { useSelector } from "react-redux";
function FooterTop() {
  const user = useSelector((state) => state.amazon.userinfo);
  return (
    <>
      {user ? (
        ""
      ) : (
        <div className="w-full bg-white py-6">
          <div className="w-full borde-t-[1px] border-b-[1px] py-8">
            <div className="w-64 mx-auto text-center flex flex-col gap-2">
              <p className="text-sm">See Personlised recommendations</p>
              <button className="w-full bg-yellow-400 rounded-md py-1 font-semibold cursor-pointer hover:bg-yellow-500  active:bg-yellow-700">
                Sign In
              </button>
              <p className="text-xs mt-1 ">
                New Customer?{" "}
                <span className="text-blue-600 ml-1 cursor-pointer">
                  Start here..
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FooterTop;
