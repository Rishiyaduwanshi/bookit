import React from 'react';
import Checkout from '@/components/Checkout';
import Cart from '@/components/Cart';
import BackButton from '@/components/BackButton';

const page = () => {
  return (
    <>
      <BackButton title="checkout" className="left-20" />
      <div className="flex m-20 gap-8">
        <Checkout />
        <Cart goTo="/confirm"  dateAndTimeSelected='selected' />
      </div>
    </>
  );
};

export default page;
