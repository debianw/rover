import useQueryRover from "../hooks/useQueryRover";

const Slider = ({ speed = 1000 }) => {
  const {
    index,
    nextImage,
    goNext,
    goPrev,
    togglePause,
    cacheSize,
    isPaused } = useQueryRover({
      speed,
    });

  return (
    <>

      {index > 0 && (
        <button onClick={goPrev}>Prev</button>
      )}
      <button onClick={goNext}>Next</button>

      <button onClick={togglePause}>{isPaused ? "Play" : "Pause"}</button>

      {nextImage ? (
        <>
          <h3>current: {nextImage.index} | cache: {cacheSize}</h3>
          <img src={nextImage.src} alt="Mars" />
        </>
      ) : null}
    </>
  );
};

export default Slider;
