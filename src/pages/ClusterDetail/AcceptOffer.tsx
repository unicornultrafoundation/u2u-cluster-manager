import React from "react";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {RiCloseLine, RiFileCopyLine} from "@remixicon/react";
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAcceptBid} from "@/hooks/useAcceptBid.ts";
import {shortenAddress} from "@/utils/string.ts";
import {toast} from "sonner";
import {Bid} from "@/types/bid.ts";
import {format} from "date-fns";

interface Props {
  orderId?: string;
  bidDetail?: Bid;
  show?: boolean;
  onClose?: () => void;
}

const AcceptOffer = ({orderId,bidDetail, show, onClose}: Props) => {
  const screenSize = useScreenSize()
  const {acceptBid, isPending} = useAcceptBid()
  if(!bidDetail) return null;
  
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
  const handleAcceptOffer = async () => {
    if(!orderId) return;
    try {
      await acceptBid({
        orderId: orderId,
        bidIndex: Number(bidDetail?.bidIndex),
      });
      onClose?.();
    } catch (error) {
      console.error("Failed to accept offer:", error);
    }
  }
  const createdAtDate = bidDetail.machine?.createdAt;
  
  
  
  const renderOrderDetails = () => {
    return (
      <>
        <div className="bg-neutral-100 p-4 md:p-6  w-full mx-auto overflow-hidden">
          <div className="space-y-3 text-sm text-[#181B1E]">
            <InfoRow label="Application" value={bidDetail?.machine.name || "--"}/>
            <InfoRow label="Provider address"
                     value={
                       <div className="flex items-center gap-2">
                         <p>{shortenAddress(bidDetail?.owner)}</p>
                         <button onClick={() => handleCopyClick(bidDetail?.owner || "0x00")} className="p-0">
                           <RiFileCopyLine className="w-4 h-4 text-neutral-400"/>
                         </button>
                       </div>
                     }/>
            <InfoRow label="Total CPU" value={`${bidDetail?.machine.cpuCores} Cores`}/>
            <InfoRow label="Total RAM" value={`${bidDetail?.machine.memoryMB / 1024} GB`}/>
            <InfoRow label="Total GPU" value={`${bidDetail?.machine.gpuMemory} GB`}/>
            <InfoRow label="Download speed" value={`${bidDetail?.machine.downloadSpeed} MB`}/>
            <InfoRow label="Upload speed" value={`${bidDetail?.machine.uploadSpeed} MB`}/>
            <InfoRow label="Start date" value={createdAtDate ? format(new Date(Number(createdAtDate) * 1000), 'MMMM d, yyyy - HH:mm:ss') : '--'}/>
            <InfoRow label="End date" value={"--"}/>
          </div>
          
          <SeparatorWithEdges/>
          
          <div className="space-y-4 text-sm">
            <InfoRow label="Transaction fee" value="0.05 U2U"/>
            <InfoRow
              label="Total cost"
              value={
                <span className="text-[#181B1E] font-title tracking-tight text-2xl">10.02 U2U</span>
              }/>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 w-full mx-auto">
          <Button
            variant="default"
            className="w-full mt-4 font-semibold text-white"
            onClick={handleAcceptOffer}
            disabled={isPending}
          >
            Accept and Sign Contract
          </Button>
          <Button
            variant="outline"
            className="w-full mt-4 font-semibold border-0 bg-neutral-50"
            onClick={onClose}>
            
            Cancel
          </Button>
        </div>
        <div className="text-center text-xs text-neutral-500 mt-3">
          <p>
            By confirming and signing contract, you agree to U2U Network
          </p>
          <div className="mt-1">
              <span className="underline underline-offset-2 cursor-pointer text-[#181B1E] font-medium">
                Terms of Service
              </span>{" "}
            and{" "}
            <span className="underline underline-offset-2 cursor-pointer text-[#181B1E] font-medium">
                Privacy Policy
              </span>
          </div>
        </div>
      </>
    )
  }
  
  return (
    <>
      {screenSize === "mobile"
        ? (
          <Drawer open={show} onOpenChange={onClose}>
            <DrawerContent className="!rounded-t-[0px] p-4 ">
              <DrawerHeader className="flex justify-between items-center  p-0 mb-4">
                <DrawerTitle className="text-2xl !font-normal uppercase">
                  accept offer
                </DrawerTitle>
                <DrawerClose onClick={onClose} className="rounded hover:bg-muted">
                  <RiCloseLine className="w-6 h-6 text-neutral-500"/>
                </DrawerClose>
              </DrawerHeader>
              {renderOrderDetails()}
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={show} onOpenChange={onClose}>
            <DialogContent
              showCloseButton={false}
              className=" w-full md:max-w-[512px]"
            >
              <DialogHeader className="flex flex-row items-center justify-between px-0 space-y-0 mb-6">
                <DialogTitle className="text-2xl !font-normal uppercase">
                  accept offer
                </DialogTitle>
                <DialogClose onClick={onClose} className="rounded hover:bg-muted">
                  <RiCloseLine className="w-6 h-6 text-neutral-500"/>
                </DialogClose>
              </DialogHeader>
              {renderOrderDetails()}
            </DialogContent>
          </Dialog>
        )}
    </>
  );
};

const InfoRow = ({label, value}: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between">
    <span className="text-neutral-500">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

const SeparatorWithEdges = () => (
  <div className="relative my-6">
    <div className="border-t border-dashed border-[#E5E7EB]"/>
    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-white rounded-full"/>
    <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-white rounded-full"/>
  </div>
);

export default AcceptOffer;
