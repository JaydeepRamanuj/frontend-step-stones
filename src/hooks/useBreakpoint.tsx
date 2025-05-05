import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<number>(630);

  useEffect(() => {
    setBreakpoint(window.innerWidth);
    function handleResize() {
      setBreakpoint(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
