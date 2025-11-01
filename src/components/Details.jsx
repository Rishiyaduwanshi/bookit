'use client';

import { useState, useMemo } from 'react';
import useBookingStore from '@/store/booking.store';

const Details = ({ slots, name, desc, about }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const { setDate, setTime, setSlotId } = useBookingStore();

  const uniqueDates = useMemo(() => {
    const dates = [...new Set(slots.map((slot) => slot.date))];
    return dates.map((date) => {
      const slot = slots.find((s) => s.date === date);
      return { date, _id: slot._id };
    });
  }, [slots]);

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return slots.filter((slot) => slot.date === selectedDate);
  }, [selectedDate, slots]);

  function handleDateSelect(e) {
    const span = e.target.closest('span');
    if (span) {
      const date = span.textContent;
      setSelectedDate(date);
      setDate(date);
      setSelectedTime(null);
      setTime(null);
    }
  }

  function handleTimeSelect(e) {
    const span = e.target.closest('span');
    if (span && selectedDate) {
      const slotId = span.getAttribute('data-id');
      const selectedSlot = slots.find((slot) => slot._id === slotId);

      // Only allow selection if the slot belongs to the selected date and is not fully booked
      if (
        selectedSlot &&
        selectedSlot.date === selectedDate &&
        selectedSlot.totalSeats - selectedSlot.bookedSeats > 0
      ) {
        setSelectedTime(span.childNodes[0].textContent.trim());
        setTime(span.childNodes[0].textContent.trim());
        setSlotId(slotId);
      }
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
            {uniqueDates.map(({ date, _id }) => {
              return (
                <span
                  data-id={_id}
                  className={`py-1.5 sm:py-2 inline-block cursor-pointer px-2 sm:px-3 border rounded-md text-xs sm:text-sm ${
                    selectedDate === date
                      ? 'bg-amber-300 text-gray-950 border-0'
                      : 'border-gray-300 text-gray-500'
                  } `}
                  key={date}
                >
                  {date}
                </span>
              );
            })}
          </div>
        </div>
        <div className="time-slots">
          <h3 className="text-base sm:text-lg md:text-xl mb-2">Choose time</h3>
          <div
            className="flex flex-wrap gap-2"
            onClick={(e) => handleTimeSelect(e)}
          >
            {slots.map(({ time, totalSeats, bookedSeats, _id, date }) => {
              const isFullyBooked = totalSeats - bookedSeats === 0;
              const isForSelectedDate = selectedDate && date === selectedDate;
              const isMuted = !selectedDate || !isForSelectedDate;

              return (
                <span
                  data-id={_id}
                  className={`py-1.5 sm:py-2 inline-block px-2 sm:px-3 border rounded-md text-xs sm:text-sm transition-all ${
                    isMuted || isFullyBooked
                      ? 'opacity-40 cursor-not-allowed'
                      : 'cursor-pointer'
                  } ${
                    selectedTime === time && isForSelectedDate
                      ? 'bg-amber-300 text-gray-950 border-0'
                      : 'border-gray-300 text-gray-500'
                  }`}
                  key={_id}
                >
                  {time}{' '}
                  <small className="text-orange-600">
                    {isFullyBooked
                      ? 'Sold out'
                      : totalSeats - bookedSeats + ' left'}
                  </small>
                </span>
              );
            })}
          </div>
        </div>
        <span className="text-gray-400 text-xs sm:text-sm">
          All times are in IST (GMT +5:30)
        </span>
      </div>
      <div>
        <h3 className="text-base sm:text-lg md:text-xl mb-2">About</h3>
        <p className="bg-gray-200 p-2 sm:p-3 text-gray-400 rounded-md text-sm sm:text-base">
          {about}
        </p>
      </div>
    </div>
  );
};

export default Details;
