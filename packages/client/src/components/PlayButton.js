import { FaPlay, FaPause } from 'react-icons/fa';

const noop = () => {};
const PlayButton = ({ isPaused, onClick = noop, ...rest }) => {
  const Component = isPaused ? FaPlay : FaPause;

  return (
    <Component onClick={onClick} {...rest} />
  );
};

export default PlayButton;