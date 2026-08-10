import React from 'react';

interface LiveProjectButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = "Live Project",
  onClick,
  href,
  className = "",
}) => {
  const buttonEl = (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-200 hover:bg-[#D7E2EA]/10 active:scale-95 cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base select-none ${className}`}
    >
      <span>{label}</span>
    </button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {buttonEl}
      </a>
    );
  }

  return buttonEl;
};
