import React from 'react';
import InfoSection from "@/pages/MyWallet/InfoSection.tsx";
import UpfrontPayment from "@/pages/MyWallet/UpfrontPayment.tsx";
import TransactionHistory from "@/pages/MyWallet/TransactionHistory.tsx";

const MyWallet: React.FC = () => {
  return (
    <div className="tablet:p-16 p-4 bg-background text-foreground min-h-screen bg-neutral-100">
      <div className="">
        <InfoSection />
        <div className='py-8'>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
        </div>
        <UpfrontPayment/>
        <div className='py-8'>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
        </div>
        <TransactionHistory />
      </div>
    </div>
  );
};

export default MyWallet;