import React from "react";

const DashboardHeading = ({ title, description }) => {
  return (
    <div className="border-b border-pink-500/30 bg-linear-to-b from-pink-500/2 to-transparent px-6 pb-6 shadow-[0_4px_20px_-4px_rgba(236,72,153,0.15)]">
      <h1 className="animate-pulse text-3xl font-black uppercase tracking-widest text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.7)] selection:bg-pink-500 selection:text-black">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          {description}
        </p>
      )}
    </div>
  );
};

export default DashboardHeading;
