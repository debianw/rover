import useQueryParams from "../hooks/useQueryParams";
import Slider from "../components/slider/Slider";

const SlideShowScreen = () => {
  const queryParams = useQueryParams();
  const speed = +(queryParams.get('speed') || 5000);

  return (
    <>
      <Slider
        autoPlay
        speed={speed}
        batchLimit={10}
      />
    </>
  )
};

export default SlideShowScreen;