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
    <div className="flex flex-col mt-10 gap-4">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-500">{desc}</p>
      <div className="slots flex flex-col gap-2">
        <div className="date-slots" onClick={(e) => handleDateSelect(e)}>
          <h3 className="text-xl">Choose date</h3>
          {slots.map(({ date }, idx) => {
            return (
              <span
                className={`py-2 inline-block cursor-pointer px-3 m-2 border rounded-md  ${
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
        <div className="time-slots" onClick={(e) => handleTimeSelect(e)}>
          <h3 className="text-xl">Choose time</h3>
          {slots.map(({ time }, idx) => {
            return (
              <span
                className={`py-2 inline-block cursor-pointer px-3 m-2 border rounded-md  ${
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
        <span className="text-gray-400 ">All times are in IST (GMT +5:30)</span>
      </div>
      <div>
        <h3 className="text-xl">About</h3>{' '}
        <p className="bg-gray-200 my-1 p-1 text-gray-400 rounded-md">{about}</p>
      </div>
    </div>
  );
};

export default Details;
