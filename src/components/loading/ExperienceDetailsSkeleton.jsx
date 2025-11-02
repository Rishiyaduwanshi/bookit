import DetailsSkeleton from './DetailsSkeleton';

const ExperienceDetailsSkeleton = () => {
  return (
    <div className="details flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-4 sm:py-6 animate-pulse">
      <div className="flex flex-col flex-1 lg:flex-3 justify-between">
        <div className="h-64 sm:h-80 md:h-96 bg-gray-300 rounded-lg"></div>

        <DetailsSkeleton />
      </div>

      <div className="w-full lg:w-auto lg:min-w-[300px] xl:min-w-[350px]">
        <div className="cart w-full hd-bg-tertiary p-4 sm:p-5 rounded-lg">
          {/* Price */}
          <div className="flex justify-between mb-3">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>

          {/* Quantity */}
          <div className="flex justify-between items-center mb-3">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-24"></div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between mb-3">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>

          {/* Taxes */}
          <div className="flex justify-between mb-3">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>

          {/* Total */}
          <div className="flex justify-between border-t border-t-gray-200 pt-3 mb-4">
            <div className="h-5 bg-gray-300 rounded w-16"></div>
            <div className="h-5 bg-gray-300 rounded w-20"></div>
          </div>

          {/* Confirm button */}
          <div className="h-10 bg-gray-300 rounded-md w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailsSkeleton;
