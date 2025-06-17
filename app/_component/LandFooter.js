import React from "react";
import Link from "next/link";

function LandFooter({ data, infoLinks = [] }) {
  return (
    <div className="bg-black w-full flex flex-col items-center pt-8 pb-8">
      {/* Popular Categories */}
      <div className="w-full max-w-[1400px]">
        <h1 className="text-slate-200 text-[18px] font-bold mb-4">Popular Categories</h1>
        <div className="flex flex-wrap gap-x-12 gap-y-4 mb-12">
          {data.map((item, key) => (
            <div key={key} className="min-w-[220px]">
              <div className="flex flex-col gap-2">
                {item.Tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={"./"}
                    className="text-slate-300 font-semibold hover:text-white hover:underline text-[15px]"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Info Links and App Buttons */}
      <div className="w-full max-w-[1400px] flex flex-row justify-between items-start mt-8">
        {/* Info Columns */}
        <div className="flex flex-row gap-20">
          {infoLinks.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-white font-bold text-[17px] mb-2">{section.title}</h2>
              <ul className="flex flex-col gap-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-slate-300 hover:text-white text-[15px]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* App Store Buttons */}
        <div className="flex flex-col gap-4 mt-4">
          <a href="#" className="inline-block">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-14" />
          </a>
          <a href="#" className="inline-block">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-14" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandFooter;
