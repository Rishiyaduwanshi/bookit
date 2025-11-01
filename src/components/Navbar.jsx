'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <nav className="text-amber-10 hd-bg-color flex sm:flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 px-4 sm:px-8 md:px-12 lg:px-20 py-3 sm:py-2 shadow-md">
      <div className="left w-sm sm:w-auto flex justify-center sm:justify-start">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="Highway Delite Logo"
            className="h-5 sm:h-12"
          />
        </Link>
      </div>
      <div className="right flex gap-2 items-center">
        <input
          type="search"
          name="searchbar"
          id="searchbar"
          placeholder="Search experiences"
          className="font-medium text-sm px-2 py-1! sm:px-5 sm:h-10  sm:py-2 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="font-medium text-sm px-2 py-1 sm:px-5 sm:h-10  sm:py-2 rounded-md transition duration-200 hover:bg-accent sm:w-auto"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
