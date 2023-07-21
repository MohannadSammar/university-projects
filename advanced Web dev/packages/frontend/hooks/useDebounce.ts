import { useRef } from "react";
import useUpdateEffect from "./useUpdateEffect";

const useDebounce = (callback: Function, dependencies: any[], timeout = 1000) => {
  const timerRef = useRef<number>();

  useUpdateEffect(() => {
    window.clearTimeout(timerRef.current!);
    timerRef.current = window.setTimeout(callback, timeout);
  }, dependencies);

  return;
};

export default useDebounce;
