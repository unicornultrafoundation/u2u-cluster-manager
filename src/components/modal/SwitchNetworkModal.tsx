import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDisconnect, useSwitchChain } from "wagmi";
import { u2uNetwork } from "@/config/wagmi";
import { useNetworkStore } from "@/store/useNetworkStore";
import { RiCloseLine } from "@remixicon/react";
import Img from "@/assets/wrong_network.png";
import { toast } from "sonner";

export const SwitchNetworkModal = () => {
  const { switchChainAsync, isPending } = useSwitchChain();
  const { disconnectAsync } = useDisconnect();
  const {
    showSwitchModal,
    closeSwitchModal,
    onCancelSwitch,
  } = useNetworkStore();
  
  const handleSwitch = async () => {
    try {
      await switchChainAsync({ chainId: u2uNetwork.id });
      toast.success("Switched to U2U network successfully");
      closeSwitchModal();
    } catch (err) {
      console.error("❌ Switch failed:", err);
      toast.error("Failed to switch network");
    }
  };
  
  const handleClose = async () => {
    await disconnectAsync();
    onCancelSwitch?.();
    closeSwitchModal();
  };
  
  return (
    <Dialog open={showSwitchModal} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="w-full pt-14 bg-white shadow-xl text-cente tablet:max-w-[432px] desktop:max-w-[512px] "
      >
        {/* Close icon */}
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={handleClose}
        >
          <RiCloseLine className="w-6 h-6 text-zinc-400 hover:text-zinc-600" />
        </div>
        
        <div className="flex flex-col items-center gap-6">
          {/* Icon */}
          <img
            src={Img}
            alt="Wrong Network"
            className="w-[110px] h-[92px]"
          />
          
          {/* Title */}
          <h2 className="text-xl tablet:text-2xl tracking-widest text-zinc-900 uppercase">
            Wrong Network Detected
          </h2>
          
          {/* Description */}
          <p className="text-zinc-500 text-sm leading-relaxed">
            Oops! It looks like you're on the wrong network. Please switch to
            the supported network to continue.
          </p>
          
          {/* Action Button */}
          <Button
            onClick={handleSwitch}
            disabled={isPending}
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
          >
            {isPending ? "Switching..." : "Switch network"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
