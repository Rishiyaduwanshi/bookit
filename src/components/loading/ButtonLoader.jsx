import Spinner from './Spinner';

const ButtonLoader = ({ text = 'Loading...', spinnerColor = 'white' }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Spinner size="sm" color={spinnerColor} />
      <span>{text}</span>
    </div>
  );
};

export default ButtonLoader;
