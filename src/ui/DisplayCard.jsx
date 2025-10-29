"use client";
import React from "react";
import Cards from "../components/Cards";
import travelData from "@/data/travelData";

const Displaycard = () => {
  console.log(travelData);

  return (
    <div
      className="card-containers grid gap-6 p-6 
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4  m-20"
    >
      {travelData.map((item, index) => (
        <Cards
          key={item.name || index}
          name={item.name}
          location={item.location}
          imgSrc={item.imgSrc}
          desc={item.description}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default Displaycard;
