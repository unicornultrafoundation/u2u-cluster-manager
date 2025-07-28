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
import {filterPaymentSchema} from "@/pages/MyWallet/PaymentHistory.tsx";
import {usePaymentFilterStore} from "@/store/filter/payment-history/store.ts";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<z.infer<typeof filterPaymentSchema>>;
}

export const FilterPaymentModal = (props: FilterModalProps) => {
  const {isOpen, onClose,form} = props;
  const [openCreatedDate, setOpenCreatedDate] = useState(false)
  const selectedType = form.watch("type");
  const selectedApplication = form.watch("application");
  const selectedDate = form.watch("date");
  
  const {updateFilters, resetFilters, filters} = usePaymentFilterStore()
  
  const handleApplyFilter = () => {
    const newFilters = {
      ...filters,
      application: selectedApplication,
      type: selectedType,
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full md:w-[200px]">
              <Button variant="outline" className="w-full justify-between border-0 rounded-none">
                {selectedApplication}
                <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
              <DropdownMenuItem onClick={() => form.setValue('application','U2DPN')}>
                U2DPN
              </DropdownMenuItem>
              {/* Add more types */}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full md:w-[200px]">
                <Button variant="outline" className="w-full justify-between border-0 rounded-none">
                  {selectedType}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none'>
                <DropdownMenuItem onClick={() => form.setValue('type','All types')}>
                  All types
                </DropdownMenuItem>
                {/* Add more types */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex gap-4">
            
            
            <Popover open={openCreatedDate} onOpenChange={setOpenCreatedDate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal border-0"
                >
                  {selectedDate ? selectedDate.toLocaleDateString() : "Date created"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full overflow-hidden mt-10" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  captionLayout="label"
                  onSelect={(date) => {
                    form.setValue('date',date)
                    setOpenCreatedDate(false)
                  }}
                  className="rounded-none !w-[345px]"
                />
              </PopoverContent>
            </Popover>
          </div>
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
