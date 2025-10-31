'use client';

import { useState } from 'react';
import useBookingStore from '@/store/booking.store';

const Details = ({ slots, name, desc, about }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const { setDate, setTime } = useBookingStore();

  function handleDateSelect(e) {
    if (e.target.tagName === 'SPAN') {
      setSelectedDate(e.target.textContent);
      setDate(e.target.textContent);
    }
  }
  function handleTimeSelect(e) {
    if (e.target.tagName === 'SPAN') {
      setSelectedTime(e.target.textContent);
      setTime(e.target.textContent);
    }
  }

  return (
    <div className="flex flex-col mt-6 sm:mt-8 md:mt-10 gap-3 sm:gap-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{name}</h2>
      <p className="text-gray-500 text-sm sm:text-base">{desc}</p>
      <div className="slots flex flex-col gap-3 sm:gap-4">
        <div className="date-slots" onClick={(e) => handleDateSelect(e)}>
          <h3 className="text-base sm:text-lg md:text-xl mb-2">Choose date</h3>
          <div className="flex flex-wrap gap-2">
            {slots.map(({ date }, idx) => {
              return (
                <span
                  className={`py-1.5 sm:py-2 inline-block cursor-pointer px-2 sm:px-3 border rounded-md text-xs sm:text-sm ${
                    selectedDate === date
                      ? 'bg-amber-300 text-gray-950 border-0'
                      : 'border-gray-300 text-gray-500'
                  } `}
                  key={idx}
                >
                  {date}
                </span>
              );
            })}
          </div>
        </div>
        <div className="time-slots" onClick={(e) => handleTimeSelect(e)}>
          <h3 className="text-base sm:text-lg md:text-xl mb-2">Choose time</h3>
          <div className="flex flex-wrap gap-2">
            {slots.map(({ time }, idx) => {
              return (
                <span
                  className={`py-1.5 sm:py-2 inline-block cursor-pointer px-2 sm:px-3 border rounded-md text-xs sm:text-sm ${
                    selectedTime === time
                      ? 'bg-amber-300 text-gray-950 border-0'
                      : 'border-gray-300 text-gray-500'
                  } `}
                  key={idx}
                >
                  {time}
                </span>
              );
            })}
          </div>
        </div>
        <span className="text-gray-400 text-xs sm:text-sm">All times are in IST (GMT +5:30)</span>
      </div>
      <div>
        <h3 className="text-base sm:text-lg md:text-xl mb-2">About</h3>
        <p className="bg-gray-200 p-2 sm:p-3 text-gray-400 rounded-md text-sm sm:text-base">{about}</p>
      </div>
    </div>
  );
};

export default Details;
