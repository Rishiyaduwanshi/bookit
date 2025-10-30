'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Cart from '@/components/Cart';
import Details from '@/components/Details';
import Image from 'next/image';
import api from './api';
import { ToastContainer, toast } from 'react-toastify';

const DisplayDetails = ({ experienceId }) => {
  const [experience, setExperience] = useState(null);
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const message =
        typeof error === 'string'
          ? error
          : error?.message || 'Failed to load experience details';
      toast.error(message);
    }
  }, [error]);

  const fetchExperienceById = useCallback(async () => {
    if (!experienceId) return;

    try {
      setIsLoading(true);
      const resp = await api.get(`/experiences/${experienceId}`);
      const experienceData = resp.data.data;

      // Extract experience details from first slot's experienceId
      if (experienceData && experienceData.length > 0) {
        setExperience(experienceData[0].experienceId);
        setSlots(experienceData);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [experienceId]);

  useEffect(() => {
    fetchExperienceById();
  }, [fetchExperienceById]);

  const availableDates = useMemo(() => {
    return [...new Set(slots.map((slot) => slot.date))];
  }, [slots]);

  const availableTimes = useMemo(() => {
    return [...new Set(slots.map((slot) => slot.time))];
  }, [slots]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );
  }

  if (!experience) {
    return (
      <div className="flex justify-center items-center h-96">
        Experience not found
      </div>
    );
  }

  return (
    <div className="details flex justify-between gap-8 m-20">
      <ToastContainer />
      <div className="flex flex-col flex-3 justify-between ">
        <div className="relative h-80 md:h-96 rounded-lg">
          <Image
            src={
              experience.imgSrc ||
              'https://images.unsplash.com/photo-1530789253388-582c481c54b0'
            }
            alt={experience.name || 'image'}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <Details
          name={experience.name}
          desc={experience.description}
          about={experience.about}
          availableDates={availableDates}
          availableTime={availableTimes}
        />
      </div>
      <Cart goTo="/checkout" />
    </div>
  );
};

export default DisplayDetails;
