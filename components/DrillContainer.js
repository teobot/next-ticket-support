import React from "react";

import DrillSegment from "./DrillSegment";

import useUser from "../lib/useUser";

import { FiEdit } from "react-icons/fi";
import Link from "next/link";

export default function DrillContainer({ _id, title, drills }) {
  const { user } = useUser();
  return (
    <div className="pb-3 pt-3 position-relative">
      <div className="w-100 d-flex justify-content-between align-items-center">
        <h1 className="font600" style={{ fontSize: "2rem" }}>
          {title}
        </h1>
        {user?.isLoggedIn && (
          <Link href={`/admin/category/${_id}`}>
            <FiEdit size={20} />
          </Link>
        )}
      </div>

      <div
        className="d-flex flex-row w-100"
        style={{
          overflowX: "auto",
        }}
      >
        {drills.map((drill) => (
          <DrillSegment key={drill.id} {...drill} />
        ))}
      </div>
    </div>
  );
}
