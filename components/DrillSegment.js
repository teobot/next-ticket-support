import React from "react";

import { useOffCanvas } from "../pages/index";

import DrillSegmentTags from "./DrillSegmentTags";
import DrillSegmentStars from "./DrillSegmentStars";

export default function DrillSegment(drill) {
  const segHeight = 180;
  const segWidth = 300;
  const segDimFactor = 1;
  const { showDrill } = useOffCanvas();
  return (
    <div
      onClick={() => showDrill(drill)}
      className="border border-1 d-flex flex-column justify-content-between pt-4 ps-3 pb-4 pr-3 bg-white mb-3 me-3"
      style={{
        minWidth: segWidth * segDimFactor,
        maxWidth: segWidth * segDimFactor,
        minHeight: segHeight * segDimFactor,
        maxHeight: segHeight * segDimFactor,
        borderRadius: 10,
      }}
    >
      <div className="w-100 d-flex align-items-center">
        <h2 className="m-0 p-0 bold">{drill.title}</h2>
      </div>
      <DrillSegmentTags title={drill.title} tags={drill.tags} />
      <DrillSegmentStars title={drill.title} stars={drill.stars} />
    </div>
  );
}
