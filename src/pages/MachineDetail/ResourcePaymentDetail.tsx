import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiCloseLine, RiArrowRightLine} from "@remixicon/react";
import type {Cluster} from "@/types";
import z from "zod";
import {formEditResourceSchema} from "@/pages/MachineDetail/EditResource.tsx";
import {UseFormReturn} from "react-hook-form";
import {useScreenSize} from "@/hooks/useScreenSize.ts";

interface Props {
  orderDetail: Cluster;
  form: UseFormReturn<z.infer<typeof formEditResourceSchema>>;
  openPaymentDetail: boolean;
  onClose: () => void;
}

const ResourceChangeItem = ({
                              label,
                              oldValue,
                              newValue,
                              unit,
                            }: {
  label: string;
  oldValue: number;
  newValue: number | undefined;
  unit: string;
}) => {
  const isIncreased = typeof newValue === "number" && newValue > oldValue;
  const isDecreased = typeof newValue === "number" && newValue < oldValue;
  const arrowColor = isIncreased ? "text-green-500" : isDecreased ? "text-red-500" : "text-gray-400";
  
  return (
    <div className="flex justify-between text-sm text-[#181B1E]">
      <span className="text-neutral-500">{label}</span>
      <span className={`font-medium flex items-center gap-1 }`}>
        {oldValue} {unit}
        {typeof newValue === "number" && newValue !== oldValue && (
          <>
            <RiArrowRightLine className={`w-4 h-4 ${arrowColor}`}/>
            {newValue} {unit}
          </>
        )}
      </span>
    </div>
  );
};

const ResourcePaymentDetail = ({form, openPaymentDetail, orderDetail, onClose}: Props) => {
  const cpu = form.watch("cpu");
  const ram = form.watch("ram");
  const gpu = form.watch("gpu");
  
  const screenSize = useScreenSize()
  
  return (
    <Sheet open={openPaymentDetail} onOpenChange={onClose}>
      <SheetContent side={`${screenSize === "mobile" ? "bottom" : "right"}`} showCloseButton={false}
                    className="w-full md:max-w-[480px] lg:max-w-[560px]  h-[584px] md:h-full flex flex-col justify-between p-4 md:p-6 bg-neutral-50 overflow-y-auto">
        <div>
          <SheetHeader className="flex flex-row items-center justify-between px-0 space-y-0 mb-6">
            <SheetTitle className="text-2xl !font-normal uppercase">Payment Detail</SheetTitle>
            <SheetClose onClick={onClose} className="rounded hover:bg-muted">
              <RiCloseLine className="w-6 h-6 text-neutral-500"/>
            </SheetClose>
          </SheetHeader>
          
          <div className="bg-white px-4 md:px-6 pt-4 pb-10 md:pt-6 md:pb-20 rounded-md w-full mx-auto overflow-hidden">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-[#181B1E]">
                  <span className="text-neutral-500">Cluster ID</span>
                  <span className="font-medium">#{orderDetail.id}</span>
                </div>
                <div className="flex justify-between text-sm text-[#181B1E]">
                  <span className="text-neutral-500">Cluster's name</span>
                  <span className="font-medium">{orderDetail.name}</span>
                </div>
                <ResourceChangeItem label="New total CPU cores" unit="Cores" oldValue={orderDetail.cpuCores}
                                    newValue={cpu}/>
                <ResourceChangeItem label="New total RAM memory" unit="GB" oldValue={orderDetail.memoryMB}
                                    newValue={ram}/>
                <ResourceChangeItem label="New total GPU memory" unit="GB" oldValue={orderDetail.gpuMemory}
                                    newValue={gpu}/>
              </div>
              
              <div className="relative my-6">
                <div className="border-t border-dashed border-[#E5E7EB]"/>
                <div
                  className="absolute -left-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
                <div
                  className="absolute -right-10 top-1/2 -translate-y-1/2 w-[32px] h-[32px] bg-neutral-50 rounded-full"/>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Transaction fee</span>
                  <span className="font-medium">0.05 U2U</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Refunded price</span>
                  <span className="font-medium">5.05 U2U</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <p className="text-neutral-500">Total price to pay</p>
                  <p className="text-[#181B1E] font-title tracking-tight text-2xl">10.02 U2U</p>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div className="mt-8">
            <Button className="w-full" disabled>
              Confirm to transfer
            </Button>
            <div className="text-center text-xs text-neutral-500 mt-3 ">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResourcePaymentDetail;
