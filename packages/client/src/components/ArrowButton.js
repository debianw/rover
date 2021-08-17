import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const noop = () => {};
const PlayButton = ({
  direction = 'right',
  isPaused,
  onClick = noop,
  hide = false,
  ...rest
}) => {
  const Component = direction === 'right' ? FaArrowAltCircleRight : FaArrowAltCircleLeft;

  if (hide) return null;

  return (
    <Component onClick={onClick} {...rest} />
  );
};

export default PlayButton;