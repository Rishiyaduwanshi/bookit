import React from 'react';
import Checkout from '@/components/Checkout';
import Cart from '@/components/Cart';
import BackButton from '@/components/BackButton';

const page = () => {
  return (
    <>
      <BackButton title="checkout" className="left-20" />
      <div className="flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-4 sm:py-6 gap-4 sm:gap-6 md:gap-8">
        <Checkout />
        <Cart goTo="/confirm"  dateAndTimeSelected='selected' />
      </div>
    </>
  );
};

export default page;
