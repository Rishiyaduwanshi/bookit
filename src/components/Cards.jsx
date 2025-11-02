'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ButtonLoader } from './loading';

const Cards = ({ id, name, location, desc, price, imgSrc }) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleViewDetails = () => {
    setIsNavigating(true);
    router.push(`/experiences/${id}`);
  };

  return (
    <div className="flex flex-col h-full md:text-md text-xs">
      <div className="image relative h-48 md:h-45">
        <Image
          src={imgSrc}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="rounded-t-lg object-cover"
          loading="lazy"
          quality={75}
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkbHB0f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA3rBbCaaJOqHnPSvqfgA="
        />
      </div>
      <div className="info hd-bg-tertiary-accent rounded-b-md flex flex-col px-3 py-2 grow">
        <div className="first flex flex-row items-center my-2 justify-between gap-2">
          <h3 className="  font-semibold text-sm">{name}</h3>
          <span className="hd-bg-tertiary rounded-md px-3 py-1 ">
            {location}
          </span>
        </div>
        <div className="second mb-2">
          <p className="hd-text-muted line-clamp-2">{desc}</p>
        </div>
        <div className="third mb-1 flex  sm:flex-row justify-between items-center gap-2 mt-auto">
          <p className="">
            From{'  '}
            <span className="font-bold text-sm">&#8377;{price}</span>
          </p>
          <button
            onClick={handleViewDetails}
            disabled={isNavigating}
            className="px-2 py-1 text-sm"
            type="button"
          >
            {isNavigating ? (
              <ButtonLoader text="Loading" spinnerColor="black" />
            ) : (
              'View Details'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
