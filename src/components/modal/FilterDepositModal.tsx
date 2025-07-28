import {Calendar} from "@/components/ui/calendar";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {RiArrowDownSLine, RiCloseLine} from "@remixicon/react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {z} from "zod";
import {UseFormReturn} from "react-hook-form";
import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import {filterDepositSchema} from "@/pages/MyWallet/DepositHistory.tsx";
import {useDepositFilterStore} from "@/store/filter/deposit-history/store.ts";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<z.infer<typeof filterDepositSchema>>;
}

export const FilterDepositModal = (props: FilterModalProps) => {
  const {isOpen, onClose ,form} = props;
  const [openDate, setOpenDate] = useState(false)
  const selectedStatus = form.watch("status")
  const selectedDate = form.watch("date")
  
  const {updateFilters, resetFilters, filters} = useDepositFilterStore()
  
  const handleApplyFilter = () => {
    const newFilters = {
      ...filters,
      status: selectedStatus,
      date: selectedDate ? selectedDate.getTime() : 0,
    };
    
    updateFilters(newFilters);
  }
  
  return (
    <Sheet modal={true} open={isOpen} onOpenChange={onClose}>
      <SheetContent showCloseButton={false}
                    className="flex h-full w-full max-w-full flex-col bg-neutral-50 rounded-none "
      >
        <SheetHeader className="flex flex-row items-center justify-between px-0">
          <SheetTitle className="text-xl font-title font-normal uppercase text-[#181B1E]">
            Filter
          </SheetTitle>
          <SheetClose onClick={onClose} className=" rounded hover:bg-muted">
            <RiCloseLine className="w-6 h-6 text-[#181B1E]"/>
          </SheetClose>
        </SheetHeader>
        
        <div className="space-y-4 flex-1 overflow-y-auto w-full">
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full md:w-[200px]">
                <Button variant="outline" className="w-full justify-between border-0 rounded-none">
                  {selectedStatus}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem onClick={() => form.setValue('status', 'All status')}>
                  All status
                </DropdownMenuItem>
                {/* Add more statuses */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          
          <Popover open={openDate} onOpenChange={setOpenDate}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between font-normal border-0"
              >
                {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
                <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full overflow-hidden mt-10" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                captionLayout="label"
                onSelect={(date) => {
                  form.setValue('date', date)
                  setOpenDate(false)
                }}
                className="rounded-none !w-[345px]"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        
        <div className="flex justify-between gap-4 pt-4">
          <Button variant="ghost" className="w-full bg-white" onClick={() => {
            resetFilters()
            onClose()
          }}>
            Reset
          </Button>
          <Button className="w-full" onClick={() => {
            handleApplyFilter()
            onClose()
          }}>
            Confirm
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
