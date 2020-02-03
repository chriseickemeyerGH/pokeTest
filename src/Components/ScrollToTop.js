import { useEffect } from "react";

const ScrollToTop = ({ someState = "" }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [someState]);

  return null;
};
export default ScrollToTop;
