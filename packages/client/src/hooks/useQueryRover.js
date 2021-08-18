import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { roverIterator, fetchTermRoverInfo } from "@rover/core/rover";
import useInterval from "./useInterval";

/**
 * Custom hook to query term rover
 * @param {*} param0
 * @returns
 */
const useQueryRover = ({ speed, limit = 6, autoPlay = true }) => {
  const [termRoverInfo, setTermRoverInfo] = useState(null);
  // const [cache, setCache] = useState([]);
  const [index, setIndex] = useState(-1);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [isPaused, setIsPause] = useState(false);
  const cacheRef = useRef([]);
  
  const totalOfImages = useMemo(() => {
    return termRoverInfo?.numImages || 0;
  }, [termRoverInfo?.numImages]);

  // -- Load term rover info
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchTermRoverInfo();
        setTermRoverInfo(response);
      } catch (error) {
        console.log("Error getting term rover info");
      }
    })();
  }, []);

  // -- Prefetch process
  const prefetch = useCallback(async () => {
    if (isPrefetching) return;

    // prevent loading more if cache reach the total images
    if (cacheRef.current.length > 0 && cacheRef.current.length === totalOfImages) return;

    if (!cacheRef.current?.[index + limit / 2]) {
      setIsPrefetching(true);

      const skip = cacheRef.current.length;
      const iterator = roverIterator(skip, limit);
      const images = [];
      for await (const value of iterator) {
        images.push({
          src: value.images.base64,
          metadata: value.metadata,
          index: value.index,
        });
      }

      cacheRef.current = [...cacheRef.current, ...images];
      setIsPrefetching(false);
    }
  }, [index, isPrefetching, limit, totalOfImages]);

  // -- Set next index
  const incrementIndex = useCallback(() => {
    setIndex((oldIndex) => {
      const nextIndex = oldIndex + 1;
      if (nextIndex === totalOfImages) return 0;
      return nextIndex;
    });
  }, [totalOfImages]);

  // -- Go next
  const goNext = useCallback(() => {
    incrementIndex();
    prefetch();
  }, [incrementIndex, prefetch]);

  // -- Go prev
  const goPrev = useCallback(() => {
    setIndex((oldIndex) => oldIndex - 1);
  }, []);

  // -- interval
  const interval = isPaused ? null : index === -1 ? 0 : speed;
  useInterval(() => {
    incrementIndex();
    prefetch();

    if (!autoPlay) {
      setIsPause(true);
      return;
    }
  }, interval);

  // -- pause/play
  const togglePause = useCallback(() => {
    setIsPause((isPaused) => !isPaused);
  }, []);

  const pause = useCallback(() => {
    setIsPause(true);
  }, []);

  const play = useCallback(() => {
    setIsPause(false);
  }, []);

  return {
    index,
    goNext,
    goPrev,
    nextImage: cacheRef.current[index],
    isPaused,
    togglePause,
    pause,
    play,
    totalOfImages,
    isPrefetching,
    cacheSize: cacheRef.current.length,
  };
};

export default useQueryRover;
