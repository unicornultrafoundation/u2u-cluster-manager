
import { useState } from "react";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx";
import {RiCloseLine, RiInformation2Line} from "@remixicon/react";
import LogoU2U from "@/assets/u2u_logo.png";
import {useScreenSize} from "@/hooks/useScreenSize.ts";
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog.tsx";
import {DialogClose, DialogTitle} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button.tsx";

export const DepositModal = () => {
  const [amount, setAmount] = useState("");
  const screenSize = useScreenSize();
  const { openModal, close } = useGlobalStore();
  const isOpen = openModal === "deposit";
  
  const content = (
    <>
      <div>
        <label className="text-sm font-medium text-neutral-600">Network</label>
        <div className="mt-1 px-4 py-3 bg-neutral-50   rounded flex items-center space-x-2">
          <img src={LogoU2U} alt="U2U" className="w-5 h-5" />
          <span className="text-sm font-medium text-neutral-800">U2U Mainnet</span>
        </div>
      </div>
      
      <div className="mt-4">
        <label className="text-sm font-medium text-neutral-600">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="mt-1 w-full px-4 py-3 bg-neutral-50   rounded text-sm focus:outline-none"
        />
      </div>
      
      <div className="mt-4 bg-sky-50   text-[#052F4A] px-4 py-3 rounded text-xs leading-5">
        <div className="flex items-start gap-2">
          <div>
            <RiInformation2Line color="#00A6F4" className="w-5 h-5 " />
          </div>
          <span>
           Once deposited into DeFio smart wallet, tokens are only used when a machine is operational after confirming to place an order.
          </span>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col md:flex-row gap-2">
        <Button variant="outline" className="flex-1 py-2 px-4 bg-black text-white  text-sm font-medium">Confirm</Button>
        <Button variant="outline" onClick={close} className="flex-1 py-2 px-4 bg-neutral-200 text-black  text-sm font-medium">Cancel</Button>
      </div>
    </>
  );
  
  return (
    <>
      {screenSize === "mobile" ? (
        <Drawer open={isOpen} onOpenChange={close}>
          <DrawerContent className="!rounded-t-none p-4 bg-white">
            <DrawerHeader className="flex justify-between items-center p-0 mb-4">
              <DrawerTitle className="text-2xl font-normal uppercase">Deposit</DrawerTitle>
              <DrawerClose onClick={close} className="rounded hover:bg-muted">
                <RiCloseLine className="w-6 h-6 text-neutral-500" />
              </DrawerClose>
            </DrawerHeader>
            {content}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={close}>
          <DialogContent showCloseButton={false} className="bg-white w-full !max-w-[432px]">
            <DialogHeader className="flex justify-between flex-row items-center px-0 mb-6">
              <DialogTitle className="text-2xl font-normal uppercase">Deposit</DialogTitle>
              <DialogClose onClick={close} className="rounded hover:bg-muted">
                <RiCloseLine className="w-6 h-6 text-neutral-500" />
              </DialogClose>
            </DialogHeader>
            {content}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
