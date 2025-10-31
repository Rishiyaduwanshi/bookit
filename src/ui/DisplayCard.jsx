// 'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Cards from '../components/Cards';
import api from '../api';
import { useToast } from '@/context/toastContext';

const Displaycard = () => {
  const [travelData, setTravelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const { showError } = useToast();

  useEffect(() => {
    if (error) {
      const message =
        typeof error === 'string'
          ? error
          : error?.message || 'Something went wrong';
      showError(message);
    }
  }, [error]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const resp = await api.get('/experiences');
      setTravelData(resp.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      className="card-containers grid gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4"
    >
      {!isLoading
        ? travelData.map((item) => (
            <Cards
              key={item._id}
              id={item._id}
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
