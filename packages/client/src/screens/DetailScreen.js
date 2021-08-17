import { useParams } from "react-router";
import SingleImage from "../components/slider/SingleImage";

const DetailScreen = () => {
  const { index } = useParams();

  return (
    <SingleImage index={index} />
  )
};

export default DetailScreen;