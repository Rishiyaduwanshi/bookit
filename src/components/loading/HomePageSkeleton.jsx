const HomePageSkeleton = () => {
  return (
    <div className="card-containers grid gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
        <div key={item} className="flex flex-col h-full animate-pulse">
          <div className="h-48 md:h-45 bg-gray-300 rounded-t-md"></div>

          <div className="hd-bg-tertiary-accent rounded-b-md flex flex-col px-3 py-2 grow">
            <div className="first flex flex-row items-center my-2 justify-between gap-2">
              <div className="h-5 bg-gray-300 rounded w-2/3"></div>
              <div className="hd-bg-tertiary rounded-md px-3 py-1 h-6 w-20"></div>
            </div>

            <div className="second mb-2 space-y-2">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-4/5"></div>
            </div>

            <div className="third mb-1 flex sm:flex-row justify-between items-center gap-2 mt-auto">
              <div className="h-5 bg-gray-300 rounded w-24"></div>
              <div className="h-8 bg-gray-300 rounded w-28"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageSkeleton;
