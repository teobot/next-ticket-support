import React from "react";

import { AiFillStar } from "react-icons/ai";

export default function DrillSegmentStars({
  title,
  stars,
  centered = false,
  size = 30,
}) {
  return (
    <div
      className={`w-100 d-flex align-items-center ${
        centered ? "justify-content-center" : ""
      }`}
    >
      {[...Array(5)].map((_, index) => (
        <AiFillStar
          color={index < stars ? "gold" : "lightgrey"}
          size={size}
          key={`${title}_star_${index}`}
        />
      ))}
    </div>
  );
}
