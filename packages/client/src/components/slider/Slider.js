import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import ArrowButton from "../ArrowButton";
import useQueryRover from "../../hooks/useQueryRover";
import styles from "./slider.module.css";

const Slider = ({ speed = 1000 }) => {
  const [showDetails, setShowDetails] = useState(false);
  const imageRef = useRef(null);

  const {
    index,
    nextImage,
    goNext,
    goPrev,
    cacheSize,
    totalOfImages,
    pause,
    play,
  } = useQueryRover({
    speed,
  });

  useEffect(() => {
    const el = document.body;
    const onMouseEnter = () => {
      setShowDetails(true);
      pause();
    };
    const onMouseLeave = () => {
      setShowDetails(false);
      play();
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
    el.removeEventListener('mouseleave', onMouseLeave);
    }
  }, [pause, play]);

  return (
    <>
      <div ref={imageRef} className={styles.root}>
        {nextImage && (
          <>
            <div className={classnames(styles.header, styles.mask)}>
              <h4>
                {nextImage.index} of {totalOfImages}
              </h4>
              <h5>cache: {cacheSize}</h5>
            </div>
            <img src={nextImage.src} alt="Mars" />

            {showDetails && (
              <div className={classnames(styles.description, styles.mask)}>
                <div>Sol: {nextImage.metadata.sol}</div>
                <div>Earth Date: {nextImage.metadata.earth_date}</div>
              </div>
            )}
          </>
        )}

        <div className={classnames(styles.actions, styles.mask)}>
          <ArrowButton
            className={styles.btn}
            hide={index <= 0}
            direction="left"
            onClick={goPrev}
          />
          <ArrowButton
            className={styles.btn}
            direction="right"
            onClick={goNext}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
