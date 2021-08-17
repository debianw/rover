import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { fetchImageByIndex } from "@rover/core/rover";
import styles from "./slider.module.css";
import useHover from "../../hooks/useHover";
import Container from "./Container";

const SingleImage = ({ index = 0 }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetchImageByIndex(index);
      setIsLoading(false);

      if (response) {
        setImage(response);
        return;
      }

      setError(new Error(`Image ${index} not found`));
    })();
  }, [index]);

  useHover({
    el: imageRef.current,
    onEnter: () => {
      console.log("enter");
      setShowDetails(true);
    },
    onOut: () => {
      setShowDetails(false);
    },
  });

  return (
    <Container>
      {isLoading && <div className={styles.centered}>Loading ...</div>}
      {error && (
        <div className={styles.centered}>
          <h1>Image not Found {index}</h1>
        </div>
      )}

      <div className={styles.centered}>
        <div ref={imageRef} className={styles.image_container}>
          {image && (
            <>
              <img src={image.images.base64} alt="Mars" />
              {showDetails && (
                <div className={classnames(styles.description, styles.mask)}>
                  <div>Sol: {image.metadata.sol}</div>
                  <div>Earth Date: {image.metadata.earth_date}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SingleImage;
