import Img from "@/assets/u2u_logo.png";
import CpuIcon from "@/assets/icons/cpu.svg";
import RamIcon from "@/assets/icons/ram.svg";
import GpuIcon from "@/assets/icons/gpu.svg";
import {RiDownload2Fill, RiUpload2Fill} from "@remixicon/react";
import {Machine} from "@/types/machine.ts";
import {Order} from "@/types";
import MachineActions from "@/pages/RequestDetail/MachineActions.tsx";

interface Props {
  orderDetail?: Order;
  refetch?: () => void;
}

const ProviderInformationSection = ({orderDetail, refetch}: Props) => {
  const acceptedMachine = orderDetail?.acceptedMachine;
  const getStatusColor = (status: Machine['status']) => {
    switch (status) {
      case 'Running':
        return 'bg-[#FFFBEB] text-[#D77A08]'
      case 'Stopped':
        return 'bg-[#ECFDF5] text-[#009966]'
      case 'Failed':
        return 'bg-[#FFF1F2] text-[#EC003F]'
      default:
        return ''
    }
  }
  
  return (
    <>
      <h5 className="uppercase font-titlet text-xl">provider information</h5>
      <div className="flex flex-col md:flex-row  justify-center  w-full "
      >
        <div className="bg-white p-4 w-full border-b md:border-b-0 md:border-r border-[#EEF0F0] flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase text-neutral-400 font-semibold">application</p>
            <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
              <img src={Img} className="w-4 h-4" alt="CPU"/>
              <p className="text-xs uppercase">U2DPN</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p className="text-xs uppercase text-neutral-400 font-semibold">provider address</p>
            <p className="text-black text-sm mt-1">{acceptedMachine?.id}</p>
          </div>
          <div className="">
            <p className="text-xs uppercase text-neutral-400 font-semibold">price</p>
            <p className="font-title uppercase text-xl text-black mt-1">35.12 u2u</p>
          </div>
        </div>
        
        <div className="bg-white p-4 w-full  border-b md:border-b-0 md:border-r border-[#EEF0F0] flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase text-neutral-400 font-semibold">start date</p>
            <p className="text-xs font-semibold mt-1">05 May, 2025</p>
          </div>
          
          <div className="text-sm text-gray-500">
            <p className="text-xs uppercase text-neutral-400 font-semibold">end date</p>
            <p className="text-sm text-black">13 May, 2025</p>
          </div>
          <div className=" ">
            <p className={`text-xs uppercase text-neutral-400 font-semibold mb-1 `}>status</p>
            <span
              className={`px-3 py-1 text-sm rounded-full ${getStatusColor(acceptedMachine?.status || 'Running')}`}> {acceptedMachine?.status}</span>
          </div>
        </div>
        
        <div className="bg-white p-4 w-full  border-b md:border-b-0 md:border-r border-[#EEF0F0] flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase text-neutral-400 font-semibold">total cpu</p>
            <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
              <img src={RamIcon} className="w-5 h-5" alt="CPU"/>
              <p className="text-xs uppercase">{acceptedMachine?.cpuCores} Cores</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase text-neutral-400 font-semibold">total ram</p>
            <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
              <img src={CpuIcon} className="w-5 h-5" alt="CPU"/>
              <p className="text-xs">{acceptedMachine?.memoryMB} GB</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase text-neutral-400 font-semibold">total gpu</p>
            <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
              <img src={GpuIcon} className="w-5 h-5" alt="CPU"/>
              <p className="text-xs uppercase">{acceptedMachine?.gpuMemory} GB</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 w-full  flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase text-neutral-400 font-semibold">download speed</p>
            <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
              <RiDownload2Fill className="w-5 h-5 fill-neutral-400"/>
              <p className="text-xs uppercase">{acceptedMachine?.downloadSpeed} Mb/s</p>
            </div>
          </div>
          
          <div>
            <p className="text-xs uppercase text-neutral-400 font-semibold">upload speed</p>
            <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
              <RiUpload2Fill className="w-5 h-5 fill-neutral-400"/>
              <p className="text-xs uppercase">{acceptedMachine?.uploadSpeed} Mb/s</p>
            </div>
          </div>
        </div>
      </div>
      <MachineActions orderDetail={orderDetail} refetch={refetch}/>
    </>
  
  
  )
}

export default ProviderInformationSection
