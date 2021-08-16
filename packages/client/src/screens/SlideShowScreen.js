import useQueryParams from "../hooks/useQueryParams";
import Slider from "../components/Slider";

const SlideShowScreen = () => {
  const queryParams = useQueryParams();
  const speed = +(queryParams.get('speed') || 1000);

  return (
    <>
      <Slider speed={speed} />
    </>
  )
};

export default SlideShowScreen;