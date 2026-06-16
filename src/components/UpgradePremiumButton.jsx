'use client';
import { Button } from '@heroui/react';
import React from 'react';

const UpgradePremiumButton = () => {

   const upgradeToPremium = async () => {
       const res = await fetch("/api/checkout_sessions", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
       });

       const data = await res.json();
       console.log(data.url);
   };

  return (
    <div>
      <Button
        onClick={upgradeToPremium}
        className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black h-11 px-6 shadow-lg shadow-yellow-500/20 shrink-0 uppercase tracking-wider transition-all duration-300 hover:scale-105"
        radius="lg"
      >
        Upgrade to Premium
      </Button>
    </div>
  );
};

export default UpgradePremiumButton;
