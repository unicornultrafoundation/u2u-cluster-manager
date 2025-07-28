import {useGlobalStore} from "@/store/useGlobalStore";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx";
import {RiCloseLine, RiFileCopyLine} from "@remixicon/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog.tsx";
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "sonner";
import LogoU2U from "@/assets/u2u_logo.png";
import {useState} from "react";


export const WithdrawModal = () => {
  const [amount, setAmount] = useState<number | "">("");
  const { openModal, close } = useGlobalStore();
  const isOpen = openModal === "withdraw";
  const screenSize = useScreenSize();
  const MAX_AMOUNT = 1000; // bạn có thể truyền từ props
  
  const renderWithdrawForm = () => (
    <div className="space-y-6">
      {/* Network */}
      <div>
        <p className="text-sm font-semibold mb-1">Network</p>
        <div className="flex items-center gap-2 bg-neutral-50 p-3">
          <img
            src={LogoU2U}
            alt="logo u2u"
            className="w-5 h-5 object-cover"
          />
          <div className=" text-sm font-semibold rounded">U2U Mainnet</div>
        </div>
      
      </div>
      
      {/* Withdraw to */}
      <div>
        <p className="text-sm font-semibold mb-1">Withdraw to</p>
        <div className="bg-neutral-50 p-3 rounded flex justify-between items-center text-sm">
         <div className="flex items-center gap-2">
           <img
             src={LogoU2U}
             alt="logo u2u"
             className="w-5 h-5 object-cover"
           />
           <span className="text-sm font-semibold ">0x123b...129</span>
         </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard
                .writeText( "")
                .then(() => {
                  toast.success("Copied to clipboard");
                })
                .catch(() => {
                  console.error("Unable copy to clipboard");
                });
            }}
          >
            <RiFileCopyLine className="fill-neutral-500 w-5 h-5"/>
          </div>
        </div>
      </div>
      
      {/* Amount */}
      <div>
        <p className="text-sm font-semibold mb-1">Amount</p>
        <div className="flex items-center bg-neutral-50 px-4 py-1 rounded">
          <Input
            id="withdraw-amount"
            type="number"
            className="flex-1 p-0 rounded bg-transparent font-medium !ring-0 outline-none text-sm"
            placeholder="0"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              setAmount(value === "" ? "" : Math.max(0, Number(value)));
            }}
            min={0}
          />
          <button
            className="text-xs font-semibold text-neutral-600 hover:bg-neutral-200 p-1"
            onClick={() => setAmount(MAX_AMOUNT)}
          >
            MAX
          </button>
        </div>
      </div>
      
      {/* Confirm/Cancel */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" className="flex-1 bg-black text-white rounded py-2 text-sm font-semibold">
          Confirm
        </Button>
        <Button
          variant="outline"
          onClick={close}
          className="flex-1 bg-neutral-200 text-neutral-800 rounded py-2 text-sm font-semibold"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
  
  return (
    <>
      {screenSize === "mobile" ? (
        <Drawer open={isOpen} onOpenChange={close}>
          <DrawerContent className="!rounded-t-none p-4 bg-white">
            <DrawerHeader className="flex justify-between items-center p-0 mb-4">
              <DrawerTitle className="text-2xl uppercase font-normal">Withdraw</DrawerTitle>
              <DrawerClose onClick={close} className="rounded hover:bg-muted">
                <RiCloseLine className="w-6 h-6 text-neutral-500" />
              </DrawerClose>
            </DrawerHeader>
            {renderWithdrawForm()}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={close}>
          <DialogContent className="bg-white w-full md:max-w-[432px] p-6" showCloseButton={false}>
            <DialogHeader className="flex justify-between flex-row items-center mb-6 px-0">
              <DialogDescription/>
              <DialogTitle className="text-2xl uppercase font-normal">Withdraw</DialogTitle>
              <DialogClose onClick={close} className="rounded hover:bg-muted">
                <RiCloseLine className="w-6 h-6 text-neutral-500" />
              </DialogClose>
            </DialogHeader>
            {renderWithdrawForm()}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
