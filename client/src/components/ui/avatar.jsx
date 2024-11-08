import React from "react";

export function Avatar({ className, children }) {
  return (
  <></>
  );
}

export function AvatarImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      onError={(e) => {
        e.target.style.display = 'none'; // Hide image if it fails to load
      }}
    />
  );
}

export function AvatarFallback({ children }) {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-300 text-gray-800 font-semibold">
      {children}
    </div>
  );
}
