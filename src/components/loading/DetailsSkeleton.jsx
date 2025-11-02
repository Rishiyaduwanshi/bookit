const DetailsSkeleton = () => {
  return (
    <div className="flex flex-col mt-6 sm:mt-8 md:mt-10 gap-3 sm:gap-4 animate-pulse">
      {/* Title */}
      <div className="h-7 sm:h-8 md:h-9 bg-gray-300 rounded w-3/4"></div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>

      {/* Slots section */}
      <div className="slots flex flex-col gap-3 sm:gap-4">
        {/* Date slots */}
        <div className="date-slots">
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map(item => (
              <div
                key={item}
                className="h-8 sm:h-9 bg-gray-300 rounded-md w-24 sm:w-28"
              ></div>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div className="time-slots">
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <div
                key={item}
                className="h-8 sm:h-9 bg-gray-300 rounded-md w-32 sm:w-36"
              ></div>
            ))}
          </div>
        </div>

        {/* IST time note */}
        <div className="h-3 bg-gray-300 rounded w-48"></div>
      </div>

      {/* About section */}
      <div>
        <div className="h-5 sm:h-6 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="bg-gray-200 p-2 sm:p-3 rounded-md space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
