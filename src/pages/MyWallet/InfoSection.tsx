import CLUSTER_ILLUSTRATION from "@/assets/wallet/wallet.png";
import LogoU2U from "@/assets/u2u_logo.png";
import {useAccount} from "wagmi";
import {shortenAddress} from "@/utils/string.ts";
import {RiCloseLine, RiDownloadFill, RiFileCopyLine, RiShareCircleLine, RiUploadFill} from "@remixicon/react";
import {toast} from "sonner";
import {Link} from "react-router-dom";
import {useDisconnect} from "@reown/appkit/react";
import {useGlobalStore} from "@/store/useGlobalStore.ts";

const InfoSection = () => {
  const open = useGlobalStore((s) => s.open);
  
  const {address, isConnected, chain} = useAccount()
  const {disconnect} = useDisconnect();
  const handleLogout = () => {
    disconnect();
  };
  
  
  return (
    <>
      <div
        className="self-stretch flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6"
      >
        <div className="flex-1 flex flex-col justify-start items-start gap-4">
          <div
            className=" p-4 w-20 h-20 md:w-28 md:h-28 lg:w-28 lg:h-28"
          >
            <img
              src={CLUSTER_ILLUSTRATION}
              alt="Cluster Illustration"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-zinc-900 font-['Pixelyze'] uppercase font-normal leading-10 text-2xl md:text-3xl">My
              Wallet</p>
            <div
              className="text-gray-500 font-['Figtree'] leading-normal justify-start font-medium md:font-normal text-sm">
              <p> {isConnected ? chain?.name : ""}</p>
            </div>
          </div>
          
          <div className="flex bg-white flex-col md:flex-row gap-4 md:gap-0 w-full justify-between p-4 md:p-5 ">
            
            <div className="flex flex-col justify-center gap-3">
              <div
                className=" flex items-center h-full gap-2">
                <img
                  src={LogoU2U}
                  alt="logo u2u"
                  className="w-5 h-5 object-cover"
                />
                <span
                  className="text-neutral-500 font-['Pixelyze'] font-normal text-sm"> {isConnected ? shortenAddress(address) : ""}</span>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(address ?? "")
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
              
              <div
                className="flex justify-center flex-col gap-1">
                <div
                  className="text-zinc-900 font-['Pixelyze'] uppercase font-normal   leading-10 text-2xl md:text-3xl flex gap-2">
                  <p> {isConnected ? "0.00" : "0.00"} </p>
                  <p className="text-neutral-400">U2U</p>
                </div>
                <span className="text-sm text-neutral-400">~$0.00</span>
              </div>
            </div>
            <div className="flex  lg:flex-row w-full lg:w-[560px] justify-end items-start lg:items-center gap-4">
              <button onClick={() => open("deposit")}
                      className=" flex items-center justify-center gap-2 bg-neutral-50 px-4 py-2  w-full md:w-auto">
                <RiDownloadFill className="fill-neutral-400 w-5 h-5"/>
                <p className="hidden md:block text-neutral-700 font-semibold text-sm">
                  Deposit
                </p>
              </button>
              
              <button onClick={() => open("withdraw")}
                      className="flex items-center justify-center gap-2 bg-neutral-50 px-4 py-2 cursor-pointer w-full md:w-auto">
                <RiUploadFill className="fill-neutral-400 w-5 h-5"/>
                <p className="hidden md:block text-neutral-700 font-semibold text-sm">
                  Withdraw
                </p>
              </button>
              <Link to={`https://u2uscan.xyz/address/${address}`} target="_blank"
                    className=" flex items-center justify-center gap-2 bg-neutral-50 px-4 py-2  w-full md:w-auto">
                <RiShareCircleLine className="fill-neutral-400 w-5 h-5"/>
                <p className="hidden md:block  text-neutral-700 font-semibold text-sm">
                  U2U Explorer
                </p>
              </Link>
              
              <button onClick={handleLogout}
                      className="flex items-center justify-center gap-2 bg-neutral-50 px-4 py-2 cursor-pointer w-full md:w-auto">
                <RiCloseLine className="fill-neutral-400 w-5 h-5"/>
                <p className="hidden md:block text-neutral-700 font-semibold text-sm">
                  Disconnect
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
   
  );
};

export default InfoSection;