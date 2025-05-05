import { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { AiOutlineStop } from "react-icons/ai";

interface CodepenCardType {
  title: string;
  codepenUrl: string;
  img: string;
  tags: Array<string>;
}

const CodepenCard = ({ title, codepenUrl, img, tags }: CodepenCardType) => {
  const parts = codepenUrl.split("/");
  const id = parts[parts.length - 1];

  const breakpoint = useBreakpoint();

  img = img + "?default-tab=result&editable=true";
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key == "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);
  }, [open]);
  return (
    <>
      <div
        ref={modalRef}
        className="w-full sm:w-[370px] bg-white/20 rounded-xl shadow-md p-2 hover:shadow-lg transition-all cursor-pointer  text-white relative group hover:scale-[1.03] hover:bg-blue-500/40"
        onClick={() => setOpen(true)}
      >
        <img
          className="w-full sm:w-[350px] sm:h-[200px] object-cover rounded-xl mx-auto"
          src={img}
          alt={title}
        />
        <h3 className="text-lg font-semibold mt-3 px-3">{title}</h3>
        <div className="flex gap-3 flex-wrap items-center mt-3 px-3">
          {tags.map((tag) => (
            <span className=" px-3 rounded bg-gray-700/80 text-white font-semibold">
              {tag}
            </span>
          ))}
        </div>
        <div className="w-full h-full text-white absolute top-0 left-0 bg-slate-800/60 flex justify-center items-center rounded-xl opacity-0 group-hover:opacity-100 text-xl font-semibold transition-all">
          Click to preview
        </div>
      </div>

      {open && (
        <div className="fixed min-h-[600px] inset-0 bg-black/40 backdrop-blur-xs z-50 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-6xl h-fit bg-white rounded-xl  shadow-xl">
            <div className="absolute -top-16 right-2 flex items-center  gap-6">
              <span className="text-white flex items-center my-6">
                Press{" "}
                <pre className="h-fit mx-3 px-3 p-0.5 bg-white/30 rounded ">
                  esc
                </pre>
                to cancel
              </span>
              <button
                onClick={() => setOpen(false)}
                className="h-fit  bg-white/80 text-slate-800 px-3 py-1 rounded hover:bg-white cursor-pointer  "
              >
                Close
              </button>
            </div>
            {isLoading && (
              <h1 className="absolute w-full h-full text-slate-800 text-4xl flex justify-center items-center z-10 top-0 left-0">
                Loading...
              </h1>
            )}

            <iframe
              className="w-full min-h-[600px]"
              scrolling="no"
              title="keyboard-effect"
              // src="https://codepen.io/Someone-coding-03/embed/dPPeZoj?default-tab=result&editable=true"
              src={`https://codepen.io/Someone-coding-03/embed/${id}?default-tab=result&editable=true`}
              frameBorder="no"
              loading="lazy"
              onLoad={() => {
                setIsLoading(false);
              }}
              allowTransparency={true}
              allowFullScreen={true}
            >
              See the Pen <a href={codepenUrl}>keyboard-effect</a> by JD (
              <a href="https://codepen.io/Someone-coding-03">
                @Someone-coding-03
              </a>
              ) on <a href="https://codepen.io">CodePen</a>.
            </iframe>
          </div>
          <div className="mt-6 bg-white-20 text-white font-semibold">
            <div className="text-center">
              Please press
              <span className="bg-white/30 rounded p-1 mx-1">HTML</span>/
              <span className="bg-white/30 rounded p-1 mx-1">CSS</span> /
              <span className="bg-white/30 rounded p-1 mx-1">JS</span> tab to
              see code. You can also edit the code.
            </div>
          </div>
          {breakpoint < 640 && (
            <div className="mt-3 flex items-center gap-2 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md text-sm">
              <AiOutlineStop className="text-5xl" />
              <span>
                Many pens are <strong>optimized for desktop</strong> viewing
                only. For the best experience, please use a larger screen.
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CodepenCard;
