import { useEffect, useRef } from "react";

const useHover = ({
  el,
  onEnter = () => {},
  onOut = () => {},
}) => {
  const onEnterRef = useRef(onEnter);
  const onOutRef = useRef(onOut);

  useEffect(() => {
    if (!el) return;
    const onEnterListener = onEnterRef.current;
    const onOutListener = onOutRef.current;

    el.addEventListener("mouseenter", onEnterListener);
    el.addEventListener("mouseleave", onOutListener);

    return () => {
      el.removeEventListener("mouseenter", onEnterListener);
      el.removeEventListener("mouseleave", onOutListener);
    };
  }, [el]);
};

export default useHover;