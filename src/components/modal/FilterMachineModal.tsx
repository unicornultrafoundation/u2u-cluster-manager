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
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {filterMachineSchema} from "@/pages/ClusterDashboard/AllMachineSection.tsx";
import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  resetFilter?: () => void;
  applyFilter?: (values: z.infer<typeof filterMachineSchema>) => void;
  form: UseFormReturn<z.infer<typeof filterMachineSchema>>;
}

export const FilterMachineModal = ({
                                     form,
                                     isOpen,
                                     onClose,
                                     resetFilter,
                                     applyFilter,
                                   }: FilterModalProps) => {
  const selectedType = form.watch("type");
  const selectedStatus = form.watch("status");
  const selectedApplication = form.watch("application");
  const selectedDateCreated = form.watch("createdDate");
  const selectedDateExpired = form.watch("expiredDate");
  const [openCreatedDate, setOpenCreatedDate] = useState(false)
  const [openDateExpired, setOpenDateExpired] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent showCloseButton={false} className="flex h-full w-full max-w-full flex-col bg-neutral-50 rounded-none">
        <SheetHeader className="flex flex-row items-center justify-between px-0">
          <SheetTitle className="text-xl font-title font-normal uppercase text-[#181B1E]">
            Filter
          </SheetTitle>
          <SheetClose onClick={onClose} className=" rounded hover:bg-muted">
            <RiCloseLine className="w-6 h-6 text-[#181B1E]"/>
          </SheetClose>
        </SheetHeader>
        
        <div className="space-y-4 flex-1 overflow-y-auto w-full">
          {/* Application */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full md:w-[200px]">
              <Button variant="outline" className="w-full justify-between border-0 rounded-none">
                {selectedApplication || "All applications"}
                <RiArrowDownSLine className="w-5 h-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none">
              <DropdownMenuItem onClick={() => form.setValue("application", "U2DPN")}>U2DPN</DropdownMenuItem>
              {/* Add more options if needed */}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex gap-4">
            {/* Type */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full md:w-[200px]">
                <Button variant="outline" className="w-full justify-between border-0 rounded-none">
                  {selectedType || "All types"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none">
                <DropdownMenuItem onClick={() => form.setValue("type", "All types")}>All types</DropdownMenuItem>
                {/* Add more types */}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Status */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full md:w-[200px]">
                <Button variant="outline" className="w-full justify-between border-0 rounded-none">
                  {selectedStatus || "All status"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] border-0 rounded-none">
                <DropdownMenuItem onClick={() => form.setValue("status", "All status")}>All status</DropdownMenuItem>
                {/* Add more statuses */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex gap-4">
            {/* Created Date */}
            <Popover open={openCreatedDate} onOpenChange={setOpenCreatedDate}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between font-normal border-0">
                  {selectedDateCreated ? selectedDateCreated.toLocaleDateString() : "Date created"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full overflow-hidden mt-10" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDateCreated}
                  captionLayout="label"
                  onSelect={(date) => {
                    form.setValue("createdDate", date);
                    setOpenCreatedDate(false);
                  }}
                  className="rounded-none !w-[305px]"
                />
              </PopoverContent>
            </Popover>
            
            {/* Expired Date */}
            <Popover open={openDateExpired} onOpenChange={setOpenDateExpired}>
              <PopoverTrigger asChild>
                <Button variant="outline" type="button" className="w-full justify-between font-normal border-0">
                  {selectedDateExpired ? selectedDateExpired.toLocaleDateString() : "Date expired"}
                  <RiArrowDownSLine className="w-5 h-5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full overflow-hidden mt-10" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDateExpired}
                  captionLayout="label"
                  onSelect={(date) => {
                    form.setValue("expiredDate", date);
                    setOpenDateExpired(false);
                  }}
                  className="rounded-none !w-[305px]"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between gap-4 pt-4">
          <Button variant="ghost" className="w-full bg-white" onClick={resetFilter}>
            Reset
          </Button>
          <Button className="w-full" onClick={applyFilter}>
            Confirm
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
