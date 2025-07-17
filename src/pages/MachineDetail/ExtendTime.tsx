import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiCloseLine, RiTimerFlashLine} from "@remixicon/react";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {CheckIcon} from "lucide-react";
import {format} from "date-fns";
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import ExtendTimePaymentDetail from "@/pages/MachineDetail/ExtendTimePaymentDetail.tsx";
import {useState} from "react";
import type {Cluster} from "@/types";

const TIME_UNITS = ["Minutes", "Hour", "Day", "Week", "Month"] as const;
type TimeUnit = typeof TIME_UNITS[number];

interface Props {
  orderDetail: Cluster;
}

function calculateNewExpiredAt(
  expiredAt: number,
  amount: number | undefined,
  unit: TimeUnit
): number | undefined {
  if(!amount || isNaN(amount)) return undefined;
  
  const multipliers: Record<TimeUnit, number> = {
    Minutes: 60 * 1000,
    Hour: 60 * 60 * 1000,
    Day: 24 * 60 * 60 * 1000,
    Week: 7 * 24 * 60 * 60 * 1000,
    Month: 30 * 24 * 60 * 60 * 1000,
  };
  
  return expiredAt + amount * multipliers[unit];
}

const ExtendTime = ({orderDetail}: Props) => {
  const [openExtend, setOpenExtend] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [unit, setUnit] = useState<TimeUnit>("Minutes");
  const [open, setOpen] = useState(false);
  const [newTime, setNewTime] = useState<number | undefined>();
  const screenSize = useScreenSize();
  
  const estimatedPrice = newTime
    ? newTime *
    (unit === "Minutes"
      ? 0.1
      : unit === "Hour"
        ? 0.5
        : unit === "Day"
          ? 2
          : unit === "Week"
            ? 10
            : 30)
    : undefined;
  
  const newExpiredAt = calculateNewExpiredAt(
    orderDetail.expiredAt?.getTime?.() || 0,
    newTime,
    unit
  );
  
  const renderTimeInput = () => (
    <div className="mt-1 flex gap-2 items-center bg-white px-4 py-2">
      <Input
        type="number"
        value={newTime || ""}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          setNewTime(isNaN(value) ? undefined : value);
        }}
        placeholder="Enter a specific time..."
        className="w-full border border-[#E5E7EB] rounded p-0 text-sm !focus:outline-none !focus:ring-0"
      />
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="border border-[#E5E7EB] rounded px-3 py-1 text-sm min-w-[100px] text-left">
            {unit}
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[150px] p-1">
          {TIME_UNITS.map((option) => (
            <div
              key={option}
              onClick={() => {
                setUnit(option);
                setOpen(false);
              }}
              className={`flex justify-between items-center cursor-pointer px-3 py-2 rounded hover:bg-gray-100 text-sm ${
                option === unit ? "font-medium text-[#181B1E]" : "text-gray-600"
              }`}
            >
              <span>{option}</span>
              {option === unit && <CheckIcon className="w-4 h-4 text-green-600"/>}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
  
  return (
    <>
      <Sheet open={openExtend} onOpenChange={setOpenExtend}>
        <SheetTrigger asChild>
          <Button variant="secondary" className="flex-1 flex">
            <RiTimerFlashLine className="w-6 h-6 text-neutral-400"/>
            <span className="ml-2 text-neutral-600 text-base font-semibold font-['Figtree']">
              Extend time
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={screenSize === "mobile" ? "bottom" : "right"}
          showCloseButton={false}
          className="w-full md:max-w-[480px] lg:max-w-[560px] h-[584px] md:h-full flex flex-col justify-between p-4 md:p-6 bg-neutral-50 overflow-y-auto"
        >
          <div>
            <SheetHeader className="flex flex-row items-center justify-between px-0 space-y-0 mb-6">
              <SheetTitle className="text-2xl !font-normal uppercase">Extend Cluster’s Time</SheetTitle>
              <SheetClose onClick={() => setOpenExtend(false)} className="rounded hover:bg-muted">
                <RiCloseLine className="w-6 h-6 text-neutral-500"/>
              </SheetClose>
            </SheetHeader>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <div className="text-sm font-medium text-[#181B1E]">Date created</div>
                <div className="mt-1 w-full px-4 py-3 bg-white rounded text-sm text-gray-600">
                  {format(orderDetail.createdAt || "", "MMMM dd, yyyy - HH:mm:ss")}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-[#181B1E]">Expired time</div>
                <div className="mt-1 w-full px-4 py-3 bg-white rounded text-sm text-gray-600">
                  {format(orderDetail.expiredAt || "", "MMMM dd, yyyy - HH:mm:ss")}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-[#181B1E] flex items-center">
                  Time extended
                  <span className="ml-2 text-gray-400 cursor-help">&#9432;</span>
                </div>
                {renderTimeInput()}
              </div>
            </form>
          </div>
          
          <div>
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-neutral-500">Estimate price</div>
              <div className="text-xl font-title !font-normal text-[#181B1E]">
                {estimatedPrice ? `${estimatedPrice.toFixed(2)} U2U` : "----"}
              </div>
            </div>
            <Button
              className="mt-2 w-full"
              disabled={!newTime || !estimatedPrice}
              onClick={() => {
                setOpenPayment(true);
                setOpenExtend(false);
              }}
            >
              Continue
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <ExtendTimePaymentDetail
        newTimeExtend={newExpiredAt || 0}
        orderDetail={orderDetail}
        openExtendTime={openPayment}
        onClose={() => setOpenPayment(false)}
      />
    </>
  );
};

export default ExtendTime;
