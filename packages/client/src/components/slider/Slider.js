import { useState } from "react";
import classnames from "classnames";
import ArrowButton from "../ArrowButton";
import useQueryRover from "../../hooks/useQueryRover";
import styles from "./slider.module.css";
import useHover from "../../hooks/useHover";
import Container from "./Container";

const Slider = ({ speed = 1000 }) => {
  const [showDetails, setShowDetails] = useState(false);

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

  useHover({
    el: document.body,
    onEnter: () => {
      pause();
      setShowDetails(true);
    },
    onOut: () => {
      setShowDetails(false);
      play();
    },
  });

  return (
    <Container>
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
    </Container>
  );
};

export default Slider;
