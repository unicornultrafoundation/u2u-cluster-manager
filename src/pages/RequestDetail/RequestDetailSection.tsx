import {RiDownload2Fill, RiUpload2Fill} from "@remixicon/react";
import Img from "@/assets/u2u_logo.png";
import CpuIcon from "@/assets/icons/cpu.svg";
import RamIcon from "@/assets/icons/ram.svg";
import GpuIcon from "@/assets/icons/gpu.svg";
import {Cluster} from "@/types";


interface Props {
  data?: Cluster;
}

const RequestDetailSection = ({data}: Props) => {
  const getStatusColor = (status: Cluster['status']) => {
    switch (status) {
      case 'Created':
        return 'bg-[#FFFBEB] text-[#D77A08]'
      case 'Accepted':
        return 'bg-[#ECFDF5] text-[#009966]'
      case 'Cancelled':
        return 'bg-[#FFF1F2] text-[#EC003F]'
      default:
        return ''
    }
  }
  
  return (
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
          <p className="text-xs uppercase text-neutral-400 font-semibold">price</p>
          <p className="font-title uppercase text-xl text-black mt-1">10 ~ 100 u2u</p>
        </div>
        <div className="text-sm text-gray-500">
          <p className="text-xs uppercase text-neutral-400 font-semibold">duration</p>
          <p className="text-black text-sm mt-1">1 Week</p>
        </div>
        <div className=" ">
          <p className={`text-xs uppercase text-neutral-400 font-semibold mb-1 `}>status</p>
          <span
            className={`px-3 py-1 text-sm rounded-full ${getStatusColor(data?.status || 'Created')}`}> {data?.status}</span>
        </div>
      </div>
      
      <div className="bg-white p-4 w-full  border-b md:border-b-0 md:border-r border-[#EEF0F0] flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase text-neutral-400 font-semibold">type</p>
          <p className="text-xs font-semibold mt-1">{data?.machineType}</p>
        </div>
        
        <div className="text-sm text-gray-500">
          <p className="text-xs uppercase text-neutral-400 font-semibold">region</p>
          <p className="text-sm text-black">{data?.region}</p>
        </div>
        <div className="text-sm text-gray-500">
          <p className="text-xs uppercase text-neutral-400 font-semibold">workload</p>
          <p className="text-black text-sm">Data Processing </p>
        </div>
        <div className="text-sm text-gray-500">
          <p className="text-xs uppercase text-neutral-400 font-semibold">description</p>
          <p className="text-sm text-black">This machine is used for running node for U2DPN server</p>
        </div>
      </div>
      
      <div className="bg-white p-4 w-full  border-b md:border-b-0 md:border-r border-[#EEF0F0] flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase text-neutral-400 font-semibold">ram required</p>
          <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
            <img src={RamIcon} className="w-5 h-5" alt="CPU"/>
            <p className="text-xs uppercase">{data?.memoryMB} Cores</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase text-neutral-400 font-semibold">cpu required</p>
          <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
            <img src={CpuIcon} className="w-5 h-5" alt="CPU"/>
            <p className="text-xs">{data?.cpuCores} GB </p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase text-neutral-400 font-semibold">gpu required</p>
          <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
            <img src={GpuIcon} className="w-5 h-5" alt="CPU"/>
            <p className="text-xs uppercase">{data?.gpuCores} GB</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 w-full  flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase text-neutral-400 font-semibold">download required</p>
          <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
            <RiDownload2Fill className="w-5 h-5 fill-neutral-400"/>
            <p className="text-xs uppercase">{data?.downloadMbps} Mb/s</p>
          </div>
        </div>
        
        <div>
          <p className="text-xs uppercase text-neutral-400 font-semibold">upload required</p>
          <div className="text-lg font-semibold text-zinc-900 flex items-center gap-2 mt-1">
            <RiUpload2Fill className="w-5 h-5 fill-neutral-400"/>
            <p className="text-xs uppercase">{data?.uploadMbps} Mb/s</p>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default RequestDetailSection;
