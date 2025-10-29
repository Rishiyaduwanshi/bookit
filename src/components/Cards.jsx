"use client";
import React from "react";
import Image from "next/image";

const Cards = ({ name, location, desc, price, imgSrc }) => {
  return (
    <div className="flex flex-col">
      <div className="image">
        <Image
          src={imgSrc}
          alt={name}
          // fill
          width={500}
          height={400}
          sizes="(max-width: 768px) 100vw, 400px"
          className="rounded-t-md object-cover"
        />
      </div>
      <div className="info hd-bg-tertiary-accent rounded-b-md flex flex-col px-3">
        <div className="first flex my-2 items-center justify-between">
          <h3>{name}</h3>{" "}
          <span className="hd-bg-tertiary rounded-md  px-4 py-1">
            {location}
          </span>
        </div>
        <div className="second">
          <p className="hd-text-muted">{desc}</p>
        </div>
        <div className="third flex justify-between items-center mb-2">
          <p>
            From <span className="text-lg font-bold">&#8377;{price}</span>
          </p>
          <button className="ml-auto px-2 py-1">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
