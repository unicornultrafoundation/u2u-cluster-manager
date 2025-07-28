import React from "react";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {RiCloseLine} from "@remixicon/react";
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx";
import {useClusterDetail} from "@/hooks/useClusterDetail.ts";

interface Props {
  id: string;
  openOrderDetail?: boolean;
  onClose?: () => void;
}

const OrderDetail = ({id, openOrderDetail, onClose}: Props) => {
  const {clusterDetail} = useClusterDetail(id as string);
  const screenSize = useScreenSize()
  
  const renderOrderDetails = () => {
    return (
      <div className="bg-white p-4 md:p-6  w-full mx-auto overflow-hidden">
        <div className="space-y-3 text-sm text-[#181B1E]">
          <InfoRow label="Application" value={clusterDetail?.name || "--"}/>
          <InfoRow label="Bid price" value={"--"}/>
          <InfoRow label="Total CPU" value={`${clusterDetail?.cpuCores} Cores`}/>
          <InfoRow label="Total RAM" value={`${clusterDetail?.memoryMB} GB`}/>
          <InfoRow label="Total GPU" value={`${clusterDetail?.gpuMemory} GB`}/>
          <InfoRow label="Download MB/s" value={`${clusterDetail?.downloadMbps} MB`}/>
          <InfoRow label="Upload MB/s" value={`${clusterDetail?.uploadMbps} MB`}/>
          <InfoRow label="Renting time" value={"--"}/>
          <InfoRow label="Type of workload" value={"--"}/>
          <InfoRow label="Region" value={clusterDetail?.region || "--"}/>
          <InfoRow label="Machine Type" value={clusterDetail?.machineType || "--"}/>
          <InfoRow label="Description" value={"--"}/>
        </div>
        
        <SeparatorWithEdges/>
        
        <div className="space-y-4 text-sm">
          <InfoRow label="Transaction fee" value="0.05 U2U"/>
          <InfoRow label="Total cost upfront"
                   value={<span className="text-[#181B1E] font-title tracking-tight text-2xl">10.02 U2U</span>}/>
        </div>
      </div>
    )
  }
  
  return (
    <>
      {screenSize === "mobile"
        ? (
          <Drawer open={openOrderDetail} onOpenChange={onClose}>
            <DrawerContent className="!rounded-t-[0px] p-4 bg-neutral-50">
              <DrawerHeader className="flex justify-between items-center  p-0 mb-4">
                <DrawerTitle className="text-2xl !font-normal uppercase">
                  Order Detail
                </DrawerTitle>
                <DrawerClose onClick={onClose} className="rounded hover:bg-muted">
                  <RiCloseLine className="w-6 h-6 text-neutral-500"/>
                </DrawerClose>
              </DrawerHeader>
              {renderOrderDetails()}
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={openOrderDetail} onOpenChange={onClose}>
            <DialogContent
              showCloseButton={false}
              className="bg-neutral-50 w-full md:max-w-[768px]"
            >
              <DialogHeader className="flex flex-row items-center justify-between px-0 space-y-0 mb-6">
                <DialogTitle className="text-2xl !font-normal uppercase">
                  Order Detail
                </DialogTitle>
                <DialogDescription/>
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
    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
    <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
  </div>
);

export default OrderDetail;
