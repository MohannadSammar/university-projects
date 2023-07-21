import { useEffect, useRef } from "react";

const useUpdateEffect = (callback: Function, dependencies: any[]) => {
  const firstCall = useRef(true);

  useEffect(() => {
    if (firstCall.current) {
      firstCall.current = false;
      return;
    }
    return callback();
  }, dependencies);
};

export default useUpdateEffect;
