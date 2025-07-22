import {useEffect} from "react";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle,} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {RiCheckFill, RiCloseLine} from "@remixicon/react";
import clsx from "clsx";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {filterTransactionSchema} from "@/pages/MyWallet/TransactionHistory.tsx";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  resetFilter?: () => void;
  applyFilter?: () => void;
  form: UseFormReturn<z.infer<typeof filterTransactionSchema>>;
}

const sortOptions = ["Sort by newest", "Sort by oldest", "Sort by status"];

export const TransactionSortModal = (props: FilterModalProps) => {
  const {isOpen, onClose, resetFilter, applyFilter, form} = props;
  const selectedSort = form.watch('sortBy')
  useEffect(() => {
    if(selectedSort) {
      return form.setValue("sortBy", selectedSort)
    }
  }, [form])
  
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
              resetFilter?.();
              onClose();
            }}
          >
            Reset
          </Button>
          <Button
            className="w-full bg-[#181B1E] text-white"
            onClick={() => {
              applyFilter?.()
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
