import Spinner from './Spinner';

const FullPageLoader = ({ message = 'Processing...' }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-xl">
        <Spinner size="xl" color="yellow" />
        <p className="text-lg font-medium text-gray-900">{message}</p>
        <p className="text-sm text-gray-500">Please wait...</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
