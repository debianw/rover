import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import ArrowButton from "../ArrowButton";
import useQueryRover from "../../hooks/useQueryRover";
import styles from "./slider.module.css";
import useHover from "../../hooks/useHover";
import Container from "./Container";

const Slider = ({ speed = 5000, batchLimit = 6, autoPlay = true }) => {
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
    autoPlay,
    speed,
    limit: batchLimit,
  });

  useHover({
    el: imageRef.current,
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
      <div className={styles.centered}>Loading ...</div>
      <div className={styles.centered}>
        <div ref={imageRef} className={styles.image_container}>
          {nextImage && (
            <>
              <div className={classnames(styles.header, styles.mask)}>
                <h4 data-testid="counter-info">
                  {+nextImage.index+1} of {totalOfImages}
                </h4>
                <h5 data-testid="cache-info">cache: {cacheSize}</h5>
              </div>
              <Link className={styles.imageLink} to={`/${index}`}>
                <img src={nextImage.src} alt={`pic-${nextImage.metadata.id}`} />
              </Link>

              {showDetails && (
                <div className={classnames(styles.description, styles.mask)}>
                  <div>Sol: {nextImage.metadata.sol}</div>
                  <div>Earth Date: {nextImage.metadata.earth_date}</div>
                </div>
              )}

              <div className={classnames(styles.actions, styles.mask)}>
                <ArrowButton
                  data-testid="left-button"
                  className={styles.btn}
                  hide={index <= 0}
                  direction="left"
                  onClick={goPrev}
                />
                <ArrowButton
                  data-testid="right-button"
                  className={styles.btn}
                  direction="right"
                  onClick={goNext}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Slider;
