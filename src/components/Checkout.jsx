import React from 'react';

const Checkout = () => {
  return (
    <div className="flex flex-3 flex-col gap-3 bg-gray-200 px-6 pt-6 rounded-lg">
      <div className="flex gap-4 w-full">
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="name">Full name</label>
          <input type="text" name="" id="name" placeholder="Your name" />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name=""
            className="text-black"
            placeholder="Your email"
            id="email"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <input type="text" placeholder="Promo code" className="py-2 w-[90%]" />
        <span className="px-3 py-2 flex-1 rounded-md cursor-pointer text-center bg-black text-amber-100 ">
          Apply
        </span>
      </div>
      <div className="flex gap-2 mt-1">
        <input
          type="checkbox"
          name="tnc"
          id="tnc"
          className="cursor-pointer bg-black"
        />
        <label htmlFor="tnc" className='text-gray-600'>I agree to the terms and safety policy</label>
      </div>
    </div>
  );
};

export default Checkout;
