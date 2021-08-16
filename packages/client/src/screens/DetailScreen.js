import { useParams } from "react-router";

const DetailScreen = () => {
  const { imageIndex } = useParams();

  return (
    <h1>DetailScreen ({imageIndex})</h1>
  )
};

export default DetailScreen;