import React from 'react'
import {useAccount, useSwitchChain} from 'wagmi'
import {u2uNetwork} from "@/config/wagmi.ts";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";

interface Props {
  children: React.ReactNode;
}

const ButtonWrap: React.FC<Props> = ({children}) => {
  const {chainId, isConnected} = useAccount()
  const {switchChainAsync, isPending} = useSwitchChain();
  const isWrongNetwork = isConnected && chainId !== u2uNetwork.id;
  
  const handleSwitchNetwork = async () => {
    try {
      await switchChainAsync({chainId: u2uNetwork.id});
      toast.success("Switched network successfully");
    } catch (err) {
      console.error("❌ Switch failed:", err);
      toast.error("Failed to switch network");
    }
  };
  
  
  return (
    <div>
      {isWrongNetwork ?
        <Button
          variant="secondary"
          size="default"
          className="px-3 w-full md:w-auto hover:bg-neutral-200 rounded-none flex items-center gap-1 text-black font-semibold bg-red-100"
          onClick={handleSwitchNetwork}
        >
          <span className="hidden md:block">  {isPending ? "Switching..." : "Switch Network"}</span>
        </Button>
        :
        <>
          {children}
        </>
      }
    </div>
  )
}

export default ButtonWrap
