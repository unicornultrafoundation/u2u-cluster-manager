import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle,} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiCloseLine} from "@remixicon/react";
import type {Cluster} from "@/types";
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import {format} from "date-fns";

interface Props {
  orderDetail: Cluster;
  openExtendTime: boolean;
  onClose: () => void;
  newTimeExtend: number;
}

const formatDate = (timestamp?: string | number | Date): string => {
  if(!timestamp) return "--";
  try {
    return format(new Date(timestamp), "MMMM dd, yyyy - HH:mm:ss");
  } catch {
    return "--";
  }
};

const ExtendTimePaymentDetail = ({
                                   newTimeExtend,
                                   openExtendTime,
                                   orderDetail,
                                   onClose,
                                 }: Props) => {
  const screenSize = useScreenSize();
  
  return (
    <Sheet open={openExtendTime} onOpenChange={onClose}>
      <SheetContent
        side={screenSize === "mobile" ? "bottom" : "right"}
        showCloseButton={false}
        className="w-full md:max-w-[480px] lg:max-w-[560px] h-[584px] md:h-full flex flex-col justify-between p-4 md:p-6 bg-neutral-50 overflow-y-auto"
      >
        <div>
          <SheetHeader className="flex flex-row items-center justify-between px-0 space-y-0 mb-6">
            <SheetTitle className="text-2xl !font-normal uppercase">
              Extend Cluster’s Time
            </SheetTitle>
            <SheetClose onClick={onClose} className="rounded hover:bg-muted">
              <RiCloseLine className="w-6 h-6 text-neutral-500"/>
            </SheetClose>
          </SheetHeader>
          <div className="bg-white px-4 md:px-6 pt-4 pb-10 md:pt-6 md:pb-20 rounded-md w-full mx-auto overflow-hidden">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-3 text-sm text-[#181B1E]">
                <InfoRow label="Cluster ID" value={`#${orderDetail.id}`}/>
                <InfoRow label="Cluster's name" value={orderDetail.name}/>
                <InfoRow
                  label="Date created"
                  value={formatDate(orderDetail.createdAt)}
                />
                <InfoRow
                  label="Old expired time"
                  value={orderDetail.expiredAt ? format(orderDetail.expiredAt , 'MMMM d, yyyy') : ""}
                />
                <InfoRow
                  label="New expired time"
                  value={formatDate(newTimeExtend)}
                />
              </div>
              <SeparatorWithEdges/>
              <div className="space-y-4 text-sm">
                <InfoRow label="Transaction fee" value="0.05 U2U"/>
                <InfoRow label="Refunded price" value="5.05 U2U"/>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-neutral-500">Total price to pay</p>
                  <p className="text-[#181B1E] font-title tracking-tight text-2xl">
                    10.02 U2U
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <Button className="w-full" disabled>
            Confirm to transfer
          </Button>
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

const InfoRow = ({label, value}: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-neutral-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const SeparatorWithEdges = () => (
  <div className="relative my-6">
    <div className="border-t border-dashed border-[#E5E7EB]"/>
    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
    <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
  </div>
);

export default ExtendTimePaymentDetail;
