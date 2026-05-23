import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "h-9 w-9", iconOnly = true }: LogoProps) {
  // If iconOnly is false, we can render the full logo with text (optional premium layout)
  if (!iconOnly) {
    return (
      <div className={`${className} overflow-hidden rounded-xl bg-transparent flex items-center justify-center`}>
        <img
          src="/img/logo.jpeg"
          alt="Twinaron Nexus Logo"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  // By default (or when iconOnly is true), we render the beautifully cropped square emblem
  // which perfectly isolates the gold/blue TN emblem and hides the text below.
  return (
    <div 
      className={`${className} relative overflow-hidden rounded-none bg-transparent flex items-center justify-center`}
    >
      <img
        src="/img/logo.jpeg"
        alt="Twinaron Nexus Icon"
        className="absolute max-w-none w-[155%] h-[155%] object-cover transition-transform duration-300"
        style={{
          top: "-12%", // Centers the emblem and crops out the text below
        }}
      />
    </div>
  );
}
