import React from "react";

const Loader = ({ size = "medium", message = "Loading..." }) => {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-12 h-12 border-3",
    large: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`loader ${sizeClasses[size]}`}></div>
      {message && <p className="mt-4 text-white/70 text-sm">{message}</p>}
    </div>
  );
};

export default Loader;
