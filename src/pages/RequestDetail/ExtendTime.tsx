import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiCalendar2Fill, RiCloseLine, RiRefreshLine, RiTimerFlashFill} from "@remixicon/react";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {format} from "date-fns";
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import React, {useState} from "react";
import type {Cluster} from "@/types";
import {Calendar} from "@/components/ui/calendar.tsx";
import {formatDateWithTime} from "@/config/constant.ts";


interface Props {
  orderDetail: Cluster;
}


const ExtendTime = ({orderDetail}: Props) => {
  const [openExtend, setOpenExtend] = useState(false);
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>();
  const [time, setTime] = useState("00:00:00");
  
  const handleConfirm = () => {
    if (!tempDate) return;
    const [h = 0, m = 0, s = 0] = time.split(":").map(Number);
    const newDate = new Date(tempDate);
    newDate.setHours(h, m, s);
    setTempDate(newDate);
    setOpen(false);
  };
  
  const screenSize = useScreenSize();
  const createdAtDate = orderDetail.acceptedMachine?.createdAt;
  
  const renderOrderDetails = () => {
    return (
      <div className="bg-white p-4 md:p-6  w-full mx-auto overflow-hidden">
        <div className="space-y-3 text-sm text-[#181B1E]">
          <InfoRow label="Machine ID" value={orderDetail?.acceptedMachine?.id || "--"}/>
          <InfoRow label="Start date" value={createdAtDate ? format(new Date(Number(createdAtDate) * 1000), 'MMMM d, yyyy - HH:mm:ss') : '--'}/>
          <InfoRow label="Old end date"
                   value={orderDetail.acceptedMachine?.expiredAt ? format(orderDetail?.acceptedMachine.expiredAt, 'MMMM d, yyyy') : "--"}/>
          <InfoRow label="New end date" value={tempDate ? formatDateWithTime(tempDate, time) : "--"}/>
        </div>
        
        <SeparatorWithEdges/>
        
        <div className="space-y-4 text-sm">
          <InfoRow label="Transaction fee" value="0.05 U2U"/>
          <InfoRow label="Refunded amount" value="0.05 U2U"/>
          <InfoRow label="Total cost"
                   value={<span className="text-[#181B1E] font-title tracking-tight text-2xl">10.02 U2U</span>}/>
        </div>
      </div>
    )
  }
  
  
  return (
    <>
      <Sheet open={openExtend} onOpenChange={setOpenExtend}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex-1 flex border-0">
            <RiTimerFlashFill className="w-6 h-6 text-neutral-400"/>
            <span className="ml-2 text-neutral-600 text-base font-semibold font-['Figtree']">
              Request new duration
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={screenSize === "mobile" ? "bottom" : "right"}
          showCloseButton={false}
          className="w-full md:max-w-[480px] lg:max-w-[560px] h-[784px] md:h-full flex flex-col justify-between p-4 md:p-6 bg-neutral-50 overflow-y-auto"
        >
          <div className="flex flex-col gap-6">
            <SheetHeader className="flex flex-row items-center justify-between px-0 space-y-0 mb-6">
              <SheetTitle className="text-2xl !font-normal uppercase">change duration</SheetTitle>
              <SheetClose onClick={() => setOpenExtend(false)} className="rounded hover:bg-muted">
                <RiCloseLine className="w-6 h-6 text-neutral-500"/>
              </SheetClose>
            </SheetHeader>
            
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="" asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-normal border-0 "
                >
                  {tempDate ? (
                    <>
                      {format(tempDate, "PP")} {time}
                    </>
                  ) : (
                    <span>Select date...</span>
                  )}
                  <RiCalendar2Fill className="w-5 h-5 text-neutral-400"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[368px] ">
                <div className="flex flex-col gap-4  ">
                  <Calendar
                    mode="single"
                    selected={tempDate}
                    onSelect={setTempDate}
                    captionLayout="label"
                    lang="en-GB"
                    className="rounded-md border-0 w-full p-0"
                  />
                  
                  <div className="flex flex-col gap-2 ">
                    <label className="text-xs text-black font-semibold ">Time</label>
                    <div className="flex items-center gap-2 bg-neutral-50 w-full pr-4">
                      <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none !ring-0"
                      />
                      <RiRefreshLine
                        className=" w-5 h-5 text-neutral-500 cursor-pointer"
                        onClick={() => {
                          setTime("00:00:00");
                        }}/>
                    </div>
                  
                  </div>
                  
                  <Button onClick={handleConfirm} disabled={!tempDate}>
                    Confirm
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            {renderOrderDetails()}
          </div>
          
          
          <Button
            className="mt-2 w-full"
            disabled={!tempDate}
            onClick={() => {
              setOpenExtend(false);
            }}
          >
            Confirm and Sign Contract
          </Button>
        </SheetContent>
      </Sheet>
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

export default ExtendTime;
