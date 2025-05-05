import { useState } from "react";
import CodepenCard from "./CodePenCard";
import { pens } from "../pens";
import { FaCodepen } from "react-icons/fa";

const tabs = [
  "All",
  "Visualizers",
  "CSS Components",
  "Utilities",
  "Fun projects",
];

export default function CodepenGallery() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <>
      <div className="w-full lg:w-[90%] mx-auto pt-10">
        <h1 className="mx-3 sm:mx-6 md:ml-20  mb-4 md:mb-6 flex justify-between items-center">
          <span className="text-2xl text-white font-bold">Mini Projects</span>
          <a href="https://codepen.io/jd-coding-03">
            <div className="flex items-center gap-2 bg-white/10 py-1 pl-2 pr-1 rounded-full">
              <span className="text-white font-semibold">More</span>
              <span className="size-8 rounded-full flex justify-center items-center bg-white/60">
                <FaCodepen className="text-2xl" />
              </span>
            </div>
          </a>
        </h1>
        <div className="flex flex-wrap gap-2 mb-4 md:mb-10 mx-3 sm:mx-3  md:ml-20">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                tab === activeTab
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-fit justify-center flex flex-wrap gap-4 p-2 sm:p-4 mx-auto">
          {pens
            .filter((pen) => {
              if (activeTab != "All") return pen.category == activeTab;
              return true;
            })
            .map((pen, index) => (
              <CodepenCard
                key={index}
                title={pen.title}
                codepenUrl={pen.codepenUrl}
                img={pen.img}
                tags={pen.tags}
              />
            ))}
        </div>
        <hr className="border-gray-500 my-3" />
        <div className="text-gray-300 text-lg text-center font-semibold py-6 px-3">
          Made with ♥️ for Web Development by
          <a
            href="https://github.com/JaydeepRamanuj"
            className="underline text-blue-400 ml-2"
          >
            Jaydeep Ramanuj
          </a>
        </div>
      </div>
    </>
  );
}
