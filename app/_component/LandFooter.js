import React from "react";
import Link from "next/link";

function LandFooter({data}) {
  
  return (
    <>
      <div className="bg-black w-full flex flex-col justify-center items-center">
        <div className="">
          <h1 className=" w-[1100px] p-2 text-slate-200 text-[16px] font-bold ">
            Popular Categories
          </h1>
        </div>
        <div className="flex flex-wrap justify-start">
          {data.map((item, key) => (
            <div key={key} className="">
              <div className="w-[271px]">
                <div className="flex flex-col pr-4 text-white gap-2 text-[14px]">
                  {item.Tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={"./"}
                      className="text-slate-300 font-semibold hover:text-white hover:underline"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LandFooter;
