'use client';
import Link from 'next/link';
const Navbar = () => {
  return (
    <nav className="text-amber-10 hd-bg-color flex justify-between items-center h-20 px-20 py-2 shadow-md">
      <div className="left">
        <Link href="/">
        <img src="/logo.svg" alt="Highway Delite Logo" />
        </Link>
      </div>
      <div className="right">
        <input
          type="search"
          name="searchbar"
          id="searchbar"
          placeholder="Search experiences"
          className=" p-3 rounded w-100 sm:h-6 lg:h-12  mr-2"
        />
        <button
          type="button"
          className=" font-medium px-5 h-12 py-2 rounded-md transition duration-200 hover:bg-accent"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
