'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Cart from '@/components/Cart';
import Details from '@/components/Details';
import { ExperienceDetailsSkeleton } from '@/components/loading';
import { useToast } from '@/context/toastContext';
import useBookingStore from '@/store/booking.store';
import useCartStore from '@/store/cart.store';
import useExperienceStore from '@/store/experience.store';
import api from '../api';

const DisplayDetails = ({ experienceId }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useToast();
  const { setCart } = useCartStore();
  const { setExperienceName } = useBookingStore();
  const { getExperience, setExperience } = useExperienceStore();

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = getExperience(experienceId);

      if (cachedData) {
        console.log('✅ Using cached data for:', experienceId);
        setCart(cachedData?.price, cachedData?.tax);
        setExperienceName(cachedData?.name);
        setData(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        console.log('🌐 Fetching from API:', experienceId);
        const resp = await api.get(`/experiences/${experienceId}`);
        const fetchedData = resp.data.data;
        setExperience(experienceId, fetchedData);

        setCart(fetchedData?.price, fetchedData?.tax);
        setExperienceName(fetchedData?.name);
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        showError(error.response?.data?.message || 'Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [experienceId]);

  if (isLoading) {
    return <ExperienceDetailsSkeleton />;
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-96">
        Experience not found
      </div>
    );
  }

  return (
    <div className="details flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-4 sm:py-6">
      <div className="flex flex-col flex-1 lg:flex-3 justify-between">
        <div className="relative h-64 sm:h-80 md:h-96 rounded-lg">
          <Image
            src={
              data.imgSrc ||
              'https://images.unsplash.com/photo-1530789253388-582c481c54b0'
            }
            alt={data.name || 'image'}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <Details
          name={data.name}
          desc={data.description}
          about={data.about}
          slots={data.slotDetails}
        />
      </div>
      <div className="w-full lg:w-auto lg:min-w-[300px] xl:min-w-[350px]">
        <Cart goTo="/checkout" />
      </div>
    </div>
  );
};

export default DisplayDetails;
