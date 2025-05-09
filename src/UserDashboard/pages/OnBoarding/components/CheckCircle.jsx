import React, { useState } from "react";
import { IoCheckmarkCircleOutline, IoCheckmarkCircle } from "react-icons/io5";

const CheckIcon = ({ checked, onChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onChange(!checked)}
      className="hover:cursor-pointer"
    >
      {checked ? (
        <IoCheckmarkCircle size={28} className="text-[#0BAAC9] text-[24px]" />
      ) : (
        <IoCheckmarkCircleOutline
          size={28}
          className={
            isHovered
              ? "text-gray-400 text-[24px]"
              : "text-[#9CA3AF] text-[24px]"
          }
        />
      )}
    </div>
  );
};

export default CheckIcon;
