import React from "react";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {RiCloseLine} from "@remixicon/react";
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx";
import {useClusterDetail} from "@/hooks/useClusterDetail.ts";
import {Button} from "@/components/ui/button.tsx";

interface Props {
  id: string;
  show?: boolean;
  onClose?: () => void;
}

const AcceptOffer = ({id, show, onClose}: Props) => {
  const {clusterDetail} = useClusterDetail(id as string);
  const screenSize = useScreenSize()
  
  const renderOrderDetails = () => {
    return (
      <>
        <div className="bg-neutral-100 p-4 md:p-6  w-full mx-auto overflow-hidden">
          <div className="space-y-3 text-sm text-[#181B1E]">
            <InfoRow label="Application" value={clusterDetail?.name || "--"}/>
            <InfoRow label="Provider address" value={"--"}/>
            <InfoRow label="Total CPU" value={`${clusterDetail?.cpuCores} Cores`}/>
            <InfoRow label="Total RAM" value={`${clusterDetail?.memoryMB} GB`}/>
            <InfoRow label="Total GPU" value={`${clusterDetail?.gpuMemory} GB`}/>
            <InfoRow label="Download speed" value={`${clusterDetail?.downloadMbps} MB`}/>
            <InfoRow label="Upload speed" value={`${clusterDetail?.uploadMbps} MB`}/>
            <InfoRow label="Start date" value={"--"}/>
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
            onClick={onClose}>
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
