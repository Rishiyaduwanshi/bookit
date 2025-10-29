import React from 'react';
import Checkout from '@/components/Checkout';
import Cart from '@/components/Cart';

const page = () => {
  return (
    <div className="flex m-20 gap-8">
      <Checkout />
      <Cart />
    </div>
  );
};

export default page;
