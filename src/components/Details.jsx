'use client';

import { useState } from 'react';

const Details = ({
  name = 'Kayaking',
  desc = 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
  availableDates = ['Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26'],
  availableTime = ['07:00 am', '09:00 am', '11:00 am'],
  about = 'Scenic routes, trained guides, and safety briefing. Minimum age 10.',
}) => {
  const [isSelected, setIsSelected] = useState(null);

  function handleDateSelect() {}
  function handleTimeSelect() {}
  return (
    <div className="flex flex-col mt-10 gap-4">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-500">{desc}</p>
      <div className="slots flex flex-col gap-2">
        <div className="date-slots" onClick={handleDateSelect}>
          <h3 className="text-xl">Choose date</h3>
          {availableDates.map((d, idx) => {
            return (
              <span
                className="py-2 cursor-pointer inline-block px-3 m-2 border border-gray-300 text-gray-500 rounded-md"
                key={idx}
              >
                {d}
              </span>
            );
          })}
        </div>
        <div className="time-slots" onClick={handleTimeSelect}>
          <h3 className="text-xl">Choose time</h3>
          {availableTime.map((t, idx) => {
            return (
              <span
                className="py-2 inline-block cursor-pointer px-3 m-2 border border-gray-300 text-gray-500 rounded-md "
                key={idx}
              >
                {t}
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
