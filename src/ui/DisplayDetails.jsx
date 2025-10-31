'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Cart from '@/components/Cart';
import Details from '@/components/Details';
import Image from 'next/image';
import api from '../api';
import { useToast } from '@/context/toastContext';
import useCartStore from '@/store/cart.store';

const DisplayDetails = ({ experienceId }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useToast();
  const { setCart } = useCartStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.get(`/experiences/${experienceId}`);
        const data = resp.data.data;
        setCart(data?.price, data?.tax);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        showError(error.response?.data?.message || 'Failed to fetch data');
      }
    };

    fetchData();
  }, [experienceId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );
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
