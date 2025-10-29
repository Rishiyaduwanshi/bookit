'use client';
import React from 'react';
import Cart from '@/components/Cart';
import Details from '@/components/Details';
import Image from 'next/image';

const DisplayDetails = () => {
  return (
    <div className="details flex justify-between   items-start m-20">
      <div className='flex flex-col justify-between '>
        <div className="relative h-80 md:h-96 rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0"
            alt="image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <Details />
      </div>
      <Cart />
    </div>
  );
};

export default DisplayDetails;
