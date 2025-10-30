// 'use client';
import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import api from './api';
import { ToastContainer, toast } from 'react-toastify';

const Displaycard = () => {
  const [travelData, setTravelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    if (error) {
      const message =
        typeof error === 'string'
          ? error
          : error?.message || 'Something went wrong';
      toast.error(message);
    }
  }, [error]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.get('/experiences');
        setTravelData(resp.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="card-containers grid gap-6 p-6 
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4  m-20"
    >
      <ToastContainer />
      {!isLoading
        ? travelData.map((item) => (
            <Cards
              key={item._id}
              name={item.name}
              location={item.location}
              imgSrc={item.imgSrc}
              desc={item.description}
              price={item.price}
            />
          ))
        : 'Loading'}
    </div>
  );
};

export default Displaycard;
