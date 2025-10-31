'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Cards = ({ id, name, location, desc, price, imgSrc }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full md:text-md text-xs">
      <div className="image relative h-48 sm:h-56 md:h-64">
        <Image
          src={imgSrc}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="rounded-t-md object-cover"
        />
      </div>
      <div className="info hd-bg-tertiary-accent rounded-b-md flex flex-col px-3 py-2 grow">
        <div className="first flex flex-row items-center my-2 justify-between gap-2">
          <h3 className="  font-semibold">{name}</h3>
          <span className="hd-bg-tertiary rounded-md px-3 py-1 whitespace-nowrap">
            {location}
          </span>
        </div>
        <div className="second mb-2">
          <p className="hd-text-muted line-clamp-2">{desc}</p>
        </div>
        <div className="third mb-1 flex  sm:flex-row justify-between items-center gap-2 mt-auto">
          <p className="font-bold">
            From{' '}
            <span>
              &#8377;{price}
            </span>
          </p>
          <button
            onClick={() => router.push(`/experiences/${id}`)}
            className="px-2 py-1"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
