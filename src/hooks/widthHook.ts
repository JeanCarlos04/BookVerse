import { useEffect, useState } from "react";

const WidthResponsiveHook = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", () => {
      handleWidth();
    });

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  return width;
};

export default WidthResponsiveHook;
