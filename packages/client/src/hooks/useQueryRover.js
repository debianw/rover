import { useState, useMemo, useCallback } from "react";
import { roverIterator } from "@rover/core/rover";
import useInterval from "./useInterval";

const useQueryRover = ({ speed, limit = 6 }) => {
  const [cache, setCache] = useState([]);
  const [index, setIndex] = useState(-1);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [isPaused, setIsPause] = useState(false);
  const nextImage = useMemo(() => {
    return cache[index];
  }, [cache, index]);

  // -- Prefetch process
  const prefetch = useCallback(async () => {
    if (isPrefetching) return;

    if (!cache?.[index + limit/2]) {
      console.log("Prefetching ...");
      setIsPrefetching(true);

      const skip = cache.length;
      const iterator = roverIterator(skip, limit);
      for await (const value of iterator) {
        setCache((oldCache) => [
          ...oldCache,
          {
            src: value.images.base64,
            metadata: value.metadata,
            index: value.index,
          },
        ]);
      }

      setIsPrefetching(false);
    }
  }, [cache, index, isPrefetching, limit]);

  // -- Go next
  const goNext = useCallback(() => {
    setIsPause(true);
    setIndex((oldIndex) => oldIndex + 1);
    prefetch();
  }, [prefetch]);

  // -- Go prev
  const goPrev = useCallback(() => {
    setIsPause(true);
    setIndex((oldIndex) => oldIndex - 1);
  }, []);

  // -- interval
  const interval = isPaused ? null : speed;
  useInterval(() => {
    setIndex((oldIndex) => oldIndex + 1);
    prefetch();
  }, interval);

  // -- pause/play
  const togglePause = useCallback(() => {
    setIsPause((isPaused) => !isPaused);
  }, []);

  return {
    index,
    goNext,
    goPrev,
    nextImage,
    isPaused,
    togglePause,
    cacheSize: cache.length,
  };
};

export default useQueryRover;
