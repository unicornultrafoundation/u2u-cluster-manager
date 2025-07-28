import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle,} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {RiCheckFill, RiCloseLine} from "@remixicon/react";
import clsx from "clsx";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {filterDepositSchema} from "@/pages/MyWallet/DepositHistory.tsx";
import {useDepositFilterStore} from "@/store/filter/deposit-history/store.ts";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<z.infer<typeof filterDepositSchema>>;
}

const sortOptions = ["Sort by newest", "Sort by oldest", "Sort by status"];

export const DepositSortModal = (props: FilterModalProps) => {
  const {isOpen, onClose, form} = props;
  const selectedSort = form.watch('sortBy')
  
  const {updateFilters, filters, resetFilters} = useDepositFilterStore()
  
  const onFilter = () => {
    const newFilters = {
      ...filters,
      orderBy: selectedSort || 'All',
    }
    updateFilters(newFilters);
  }
  
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="!rounded-t-[0px] px-6   bg-[#F7F8F8]">
        <DrawerHeader className="flex items-center justify-between px-0">
          <DrawerTitle className="text-xl font-title font-normal  text-[#181B1E]">
            SORT BY
          </DrawerTitle>
          <DrawerClose onClick={onClose} className="p-2 rounded hover:bg-muted">
            <RiCloseLine className="w-5 h-5 text-[#181B1E]"/>
          </DrawerClose>
        </DrawerHeader>
        <div className="mt-6 space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option}
              className={clsx(
                "w-full text-left px-4 py-3 rounded-md flex items-center justify-between",
                selectedSort === option
                  ? "bg-white font-medium text-[#181B1E]"
                  : "text-[#6B7A78] hover:bg-white"
              )}
              onClick={() => form.setValue('sortBy', option)}
            >
              {option}
              {selectedSort === option && (
                <RiCheckFill className="text-green-500 w-4 h-4"/>
              )}
            </button>
          ))}
        </div>
        <DrawerFooter className="mt-6 px-0 flex flex-row gap-4">
          <Button
            variant="outline"
            className="w-full bg-white"
            onClick={() => {
              resetFilters();
              onClose();
            }}
          >
            Reset
          </Button>
          <Button
            className="w-full bg-[#181B1E] text-white"
            onClick={() => {
              onFilter()
              onClose();
            }}
          >
            Confirm
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
