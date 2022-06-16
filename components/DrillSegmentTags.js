import React from "react";

import { Badge } from "react-bootstrap";

export default function DrillSegmentTags({
  title,
  tags,
  centered = false,
  spaceEvenly = false,
}) {
  return (
    <div
      className={`w-100 d-flex align-items-center ${
        centered ? `justify-content-${spaceEvenly ? "evenly" : "center"}` : ""
      }`}
      style={{ overflowX: "hidden" }}
    >
      {tags.map((tag, index) => (
        <h3 key={`${title}_${tag}_${index}`} className="m-0 p-0 me-3">
          <Badge bg="primary">{tag}</Badge>
        </h3>
      ))}
    </div>
  );
}
