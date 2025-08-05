import {useState} from 'react'
import {RiArrowLeftSFill, RiArrowRightSFill, RiDownload2Fill, RiFileCopyLine, RiUpload2Fill} from '@remixicon/react'
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import NoDataImg from "@/assets/no_data.png";
import Img from "@/assets/u2u_logo.png";

import CpuIcon from "@/assets/icons/cpu.svg";
import RamIcon from "@/assets/icons/ram.svg";
import GpuIcon from "@/assets/icons/gpu.svg";
import {Button} from "@/components/ui/button.tsx";
import {useProviderOffers} from "@/hooks/useProviderOffers.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {toast} from "sonner";
import AcceptOffer from "@/pages/ClusterDetail/AcceptOffer.tsx";


const SkeletonCard = () => (
  <div className="bg-white p-4 flex flex-col gap-4 rounded-md">
    <div className="flex items-center gap-3">
      <Skeleton className="w-12 h-12 rounded-full"/>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[80px] h-4 rounded-md"/>
        <Skeleton className="w-[120px] h-3 rounded-md"/>
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <div className="w-full px-4 py-3 border border-neutral-100">
        <Skeleton className="w-[60px] h-3 mb-2"/>
        <Skeleton className="w-[80px] h-4"/>
      </div>
      <div className="w-full px-4 py-3 border border-neutral-100 flex flex-col gap-2">
        {Array.from({length: 5}).map((_, i) => (
          <Skeleton key={i} className="w-32 h-3"/>
        ))}
      </div>
    </div>
    <Skeleton className="w-full h-9 rounded-md"/>
  </div>
);

const ProviderOfferSection = () => {
  const [showAcceptOffer, setShowAcceptOffer] = useState(false)
  const [offerId, setOfferId] = useState('')
  const screenSize = useScreenSize()
  const itemsPerPage = screenSize === 'mobile' ? 3 : 6;
  const [currentPage, setCurrentPage] = useState(1)
  const {providerOffers, isLoading, total} = useProviderOffers({page: currentPage, limit: itemsPerPage})
  const totalPages = Math.ceil(total / itemsPerPage);
  
  
  const handleCopyClick = (address: string) => {
    navigator.clipboard
      .writeText(address || '')
      .then(() => {
        toast.success('Copied address to clipboard');
      })
      .catch((err) => {
        console.error('Unable to copy address to clipboard', err);
        toast.error('Unable to copy');
      });
  };
  
  
  return (
    <div className="flex flex-col gap-6 w-full">
      <h5 className="uppercase font-titlet text-xl">provider offer</h5>
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length: itemsPerPage}).map((_, i) => (
              <SkeletonCard key={i}/>
            ))}
          </div>
        ) : total === 0 ? (
          <div className="w-full text-center flex flex-col items-center h-full min-h-[300px] md:min-h-[600px]">
            <img
              className="w-[93px] h-[83px] mx-auto mb-4"
              src={NoDataImg}
              alt="No data"
            />
            <h2 className="font-pixelyze text-lg md:text-xl uppercase tracking-tighter">
              No data available
            </h2>
            <p className="text-sm text-neutral-500">
              Connect your wallet and create new cluster
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {providerOffers?.map((machine) => (
              <div key={machine.id} className="bg-white p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img src={Img} alt="App Logo" className="w-12 h-12"/>
                  <div>
                    <div className="text-[#181B1E] font-bold text-lg tracking-widest font-title uppercase">
                      {machine.providerName}
                    </div>
                    <div className="text-[#6D6D6D] text-sm flex items-center gap-1">
                      <p>{machine.providerAddress}</p>
                      <button onClick={() => handleCopyClick(machine.providerAddress)} className="p-0">
                        <RiFileCopyLine className="w-4 h-4 text-neutral-400"/>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center border border-neutral-100">
                  <div className="w-full px-4 py-3  h-full  md:border-r border-b md:border-b-0 border-neutral-100">
                    <p className="text-sm uppercase text-neutral-400 font-semibold ">
                      Price
                    </p>
                    <p className="font-title text-black text-lg uppercase">
                      {machine.price} {machine.currency}
                    </p>
                  </div>
                  <div className="w-full px-4 py-3 ">
                    <p className="text-sm uppercase text-neutral-400 font-semibold mb-2">
                      machine system
                    </p>
                    <div className="flex items-center gap-2">
                      <img src={RamIcon} className="w-4 h-4" alt="ram"/>
                      <p className="text-xs font-semibold">{machine.system.cpu}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <img src={CpuIcon} className="w-4 h-4" alt="cpu"/>
                      <p className="text-xs font-semibold">{machine.system.ram}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <img src={GpuIcon} className="w-4 h-4" alt="disk"/>
                      <p className="text-xs font-semibold">{machine.system.disk}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <RiDownload2Fill className="w-4 h-4 fill-neutral-400"/>
                      <p className="text-xs font-semibold">{machine.system.downloadMb}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <RiUpload2Fill className="w-4 h-4 fill-neutral-400"/>
                      <p className="text-xs font-semibold">{machine.system.uploadMb}</p>
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => {
                  setShowAcceptOffer(true)
                  setOfferId(machine.id)
                }} variant="default" className="w-full">
                  Accept offer
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <RiArrowLeftSFill
            className={`w-5 h-5 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-800'}`}
          />
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <RiArrowRightSFill
            className={`w-5 h-5 ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-800'}`}
          />
        </button>
      </div>
      <AcceptOffer show={showAcceptOffer} onClose={() => setShowAcceptOffer(false)} id={offerId}/>
    
    </div>
  )
}

export default ProviderOfferSection
