import CLUSTER_ILLUSTRATION from "@/assets/wallet/wallet.png";
import {useAccount} from "wagmi";
import {shortenAddress} from "@/utils/string.ts";
import {RiCloseLine, RiFileCopyLine, RiShareCircleLine} from "@remixicon/react";
import {toast} from "sonner";
import {Link} from "react-router-dom";
import {useDisconnect} from "@reown/appkit/react";

const InfoSection = () => {
  const {address, isConnected, chain} = useAccount()
  const {disconnect} = useDisconnect();
  const handleLogout = () => {
    disconnect();
  };
  
  
  return (
    <div
      className="self-stretch flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6"
      data-data="No"
      data-device="Responsive"
    >
      {/* Left Section: Cluster Illustration and Title */}
      <div className="flex-1 flex flex-col justify-start items-start gap-4">
        {/* Cluster Illustration */}
        <div
          data-type="Cluster"
          className="relative p-4 w-20 h-20 md:w-28 md:h-28 lg:w-28 lg:h-28"
        >
          <img
            src={CLUSTER_ILLUSTRATION}
            alt="Cluster Illustration"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Title and Subtitle */}
        <div className="flex flex-col justify-center gap-1">
          <div
            className="text-zinc-900 font-['Pixelyze'] uppercase font-normal justify-center items-center leading-10 text-2xl md:text-3xl flex gap-2">
            <p>
              Address:
            </p>
            <p> {isConnected ? shortenAddress(address) : ""}</p>
            <div
              className="flex items-center gap-3 cursor-pointer"
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
              <RiFileCopyLine className="fill-neutral-500 w-8 h-8"/>
            </div>
          </div>
          <div
            className="text-gray-500 font-['Figtree'] leading-normal justify-start font-medium md:font-normal text-sm">
            <p> {isConnected ? chain?.name : ""}</p>
          </div>
        </div>
      </div>
      {/* Right Section: Stats */}
      <div
        className="flex  lg:flex-row w-full lg:w-[560px] justify-end items-start lg:items-center gap-4 lg:gap-8">
        <Link to="https://u2uscan.xyz/" target="_blank"
              className=" flex items-center justify-center gap-2 bg-white px-4 py-2  w-full md:w-auto">
          <RiShareCircleLine className="fill-neutral-500 w-5 h-5"/>
          <p className="hidden md:block font-bold text-neutral-700  text-sm">
            U2U Explorer
          </p>
        </Link>
        
        <button onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-white px-4 py-2 cursor-pointer w-full md:w-auto">
          <RiCloseLine className="fill-neutral-500 w-5 h-5"/>
          <p className="hidden md:block text-neutral-700 font-bold text-sm">
            Disconnect
          </p>
        </button>
      </div>
    </div>
  );
};

export default InfoSection;