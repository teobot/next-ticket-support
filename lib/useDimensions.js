import { useState, useEffect } from "react";

export default () => {
  const [windowWidth, setWindowWidth] = useState(1000);
  const [windowHeight, setWindowHeight] = useState(1000);

  const handleResize = () => {
    if (window != undefined || null) {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
    console.log(windowWidth, windowHeight);
  }, [windowWidth, windowHeight]);

  return { windowWidth, windowHeight };
};
