import React from 'react';
import InfoSection from "@/pages/MyWallet/InfoSection.tsx";
import PaymentHistory from "@/pages/MyWallet/PaymentHistory.tsx";
import DepositHistory from "@/pages/MyWallet/DepositHistory.tsx";
import {DepositModal} from "@/components/modal/DepositModal.tsx";
import {WithdrawModal} from "@/components/modal/WithdrawModal.tsx";

const MyWallet: React.FC = () => {
  return (
    <div className="tablet:p-16 p-4 bg-background text-foreground min-h-screen bg-neutral-50">
      <div className="">
        <InfoSection />
        <div className='py-8'>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
        </div>
        <PaymentHistory/>
        <div className='py-8'>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
        </div>
        <DepositHistory />
      </div>
      <DepositModal/>
      <WithdrawModal/>
    </div>
  );
};

export default MyWallet;