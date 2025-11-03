'use client';
import { useState } from 'react';
import API from '@/api';
import BackButton from '@/components/BackButton';
import BookingDetailsCard from '@/components/BookingDetailsCard';
import { ButtonLoader } from '@/components/loading';

export default function TrackBooking() {
  const [searchType, setSearchType] = useState('email');
  const [searchValue, setSearchValue] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async e => {
    e.preventDefault();
    setError('');
    setBookings([]);
    setSearched(false);

    if (!searchValue.trim()) {
      setError('Please enter a value to search');
      return;
    }

    setLoading(true);

    try {
      const params =
        searchType === 'email'
          ? { email: searchValue.trim() }
          : { bookingId: searchValue.trim() };

      const response = await API.get('/bookings/details', { params });

      setBookings(response.data.data || []);
      setSearched(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to find booking details. Please check your information and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchValue('');
    setBookings([]);
    setError('');
    setSearched(false);
  };

  return (
    <>
      <BackButton />
      <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-20 mb-10 mt-7">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 border border-gray-200">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
            Track Your Booking
          </h1>
          <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
            Enter your email address or booking ID to view your booking details
          </p>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4 justify-center mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="email"
                  checked={searchType === 'email'}
                  onChange={e => setSearchType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-gray-800 font-medium text-sm sm:text-base">
                  Email
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="bookingId"
                  checked={searchType === 'bookingId'}
                  onChange={e => setSearchType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-gray-800 font-medium text-sm sm:text-base">
                  Booking ID
                </span>
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                type={searchType === 'email' ? 'email' : 'text'}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder={
                  searchType === 'email'
                    ? 'Enter your email address'
                    : 'Enter your booking ID'
                }
                className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all text-sm sm:text-base text-gray-900"
                disabled={loading}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 sm:px-6 py-3 hd-btn-primary text-gray-900 font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] sm:min-w-[120px] text-sm sm:text-base"
                >
                  {loading ? <ButtonLoader spinnerColor="black" /> : 'Search'}
                </button>
                {(searched || error || bookings.length > 0) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 sm:px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all text-sm sm:text-base"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-lg">
              <p className="text-red-800 text-center text-sm sm:text-base font-medium">
                {error}
              </p>
            </div>
          )}
        </div>

        {searched && bookings.length === 0 && !error && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200">
            <div className="text-4xl sm:text-6xl mb-4">🔍</div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              No Bookings Found
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              We couldn't find any bookings with the provided information.
            </p>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <BookingDetailsCard
                key={booking._id || index}
                booking={booking}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
