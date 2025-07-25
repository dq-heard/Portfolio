import { useEffect, useRef } from "react";

export function useSectionReady(callback: () => void, deps: any[] = []) {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;
    callback();
  }, deps);
}
