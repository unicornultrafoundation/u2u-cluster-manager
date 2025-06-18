import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ILLUS from "@/assets/cluster_detail_page/illus.png";
import STAT_BG from "@/assets/cluster_detail_page/stat_bg.png";
import {RiFileCopyLine, RiShutDownFill, RiEditBoxFill, RiTimerFlashFill} from '@remixicon/react'
import { useClusterDetail } from "@/hooks/useClusterDetail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ClusterDetail = () => {
  const { clusterDetail } = useClusterDetail();

  function renderControlSection() {
    if (clusterDetail.status === "ACTIVE") {
      return (
        <div className="self-stretch inline-flex justify-start items-start gap-4">
          <Button variant="secondary" className="flex-1 flex">
            <RiShutDownFill className="w-6 h-6 text-neutral-400" />
            <div className="h-6 flex justify-center items-center gap-2">
              <div className="text-center justify-center text-neutral-600 text-base font-semibold font-['Figtree'] leading-normal">
                Turn OFF
              </div>
            </div>
          </Button>
          <Button variant="secondary" className="flex-1 flex">
            <RiEditBoxFill className="w-6 h-6 text-neutral-400" />
            <div className="h-6 flex justify-center items-center gap-2">
              <div className="text-center justify-center text-neutral-600 text-base font-semibold font-['Figtree'] leading-normal">
                Edit resources
              </div>
            </div>
          </Button>
          <Button variant="secondary" className="flex-1 flex">
            <RiTimerFlashFill className="w-6 h-6 text-neutral-400" />
            <div className="h-6 flex justify-center items-center gap-2">
              <div className="text-center justify-center text-neutral-600 text-base font-semibold font-['Figtree'] leading-normal">
                Extend time
              </div>
            </div>
          </Button>
        </div>
      );
    }
    return (
      <Button variant="destructive" className="flex-1 flex w-full">
        <div className="text-center justify-center text-stone-50 text-base font-semibold font-['Figtree'] leading-normal">Cancel order</div>
      </Button>
    );
  }

  return (
    <div className="self-stretch w-full pt-12 pb-24 inline-flex justify-center items-start gap-16 overflow-hidden bg-stone-50">
      <div
        data-device="Desktop"
        data-state="Creating"
        className="w-[768px] inline-flex flex-col justify-start items-start gap-8"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Overview</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Cluster Detail</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="self-stretch flex flex-col justify-center items-start gap-4">
          <img src={ILLUS} alt="illus" className="w-28 py-5 px-2" />
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-zinc-900 text-2xl font-normal font-['Pixelyze'] uppercase leading-loose">
              {clusterDetail.status === "ACTIVE"
                ? "Active cluster"
                : "Cluster is being created..."}
            </div>
            <div className="justify-start text-gray-500 text-sm font-normal font-['Figtree'] leading-normal">
              {clusterDetail.status === "ACTIVE"
                ? "This cluster is currently activated"
                : "Please wait for your order to be completed"}
            </div>
          </div>
        </div>
        <div
          data-device="Desktop"
          data-state="Default"
          className="self-stretch p-6 relative bg-white inline-flex justify-start items-start gap-6 overflow-hidden"
        >
          <div className="w-[768px] h-28 left-0 top-0 absolute">
            <div className="w-[768px] left-0 top-[100px] bg-white absolute inline-flex justify-start items-center gap-1">
              <div className="flex-1 h-2 bg-neutral-600" />
              <div className="flex-1 h-2 bg-neutral-600" />
            </div>
            <img src={STAT_BG} alt="stat_bg" className="w-full h-full" />
          </div>
          <div className="flex-1 z-10 relative h-14 inline-flex flex-col justify-start items-center gap-1">
            <div className="justify-center text-gray-500 text-sm font-semibold font-['Figtree'] uppercase leading-normal tracking-wide">
              Total CPU cores
            </div>
            <div className="justify-center text-white text-xl font-normal font-['Pixelyze'] uppercase leading-loose">
              32 Cores
            </div>
          </div>
          <div className="flex-1 z-10 relative h-14 inline-flex flex-col justify-start items-center gap-1">
            <div className="justify-center text-gray-500 text-sm font-semibold font-['Figtree'] uppercase leading-normal tracking-wide">
              Total RAM memory
            </div>
            <div className="justify-center text-white text-xl font-normal font-['Pixelyze'] uppercase leading-loose">
              64 GB
            </div>
          </div>
          <div className="flex-1 z-10 relative h-14 inline-flex flex-col justify-start items-center gap-1">
            <div className="justify-center text-gray-500 text-sm font-semibold font-['Figtree'] uppercase leading-normal tracking-wide">
              Total GPU memory
            </div>
            <div className="justify-center text-white text-xl font-normal font-['Pixelyze'] uppercase leading-loose">
              256 GB
            </div>
          </div>
        </div>
        <div className="self-stretch p-6 bg-white flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="justify-start text-gray-500 text-base font-normal font-['Figtree'] leading-normal">
              Cluster ID
            </div>
            <div className="justify-center text-zinc-900 text-base font-medium font-['Figtree'] leading-normal">
              #{clusterDetail.id}
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="justify-start text-gray-500 text-base font-normal font-['Figtree'] leading-normal">
              Cluster’s name
            </div>
            <div className="justify-center text-zinc-900 text-base font-medium font-['Figtree'] leading-normal">
              {clusterDetail.name}
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="justify-start text-neutral-400 text-base font-normal font-['Figtree'] leading-normal">
              IP Head node
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="justify-center text-zinc-900 text-base font-medium font-['Figtree'] leading-normal">
                10.0.0.0:4123
              </div>
              <Button variant="ghost" size="sm" className="p-1">
                <RiFileCopyLine className="w-6 h-6 text-neutral-400" />
              </Button>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="justify-start text-neutral-400 text-base font-normal font-['Figtree'] leading-normal">
              IP Dashboard
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="justify-center text-zinc-900 text-base font-medium font-['Figtree'] leading-normal">
                10.0.0.0:4123
              </div>
              <Button variant="ghost" size="sm" className="p-1">
                <RiFileCopyLine className="w-6 h-6 text-neutral-400" />
              </Button>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="justify-start text-gray-500 text-base font-normal font-['Figtree'] leading-normal">
              Date Created
            </div>
            <div className="justify-start text-zinc-900 text-base font-medium font-['Figtree'] leading-normal">
              May 05, 2025 - 16:12:46
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="justify-start text-gray-500 text-base font-normal font-['Figtree'] leading-normal">
              Date Expired
            </div>
            <div className="justify-start text-zinc-900 text-base font-medium font-['Figtree'] leading-normal">
              May 12, 2025 - 16:12:46
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-start">
            <div className="justify-start text-gray-500 text-base font-normal font-['Figtree'] leading-normal">
              Type of workload
            </div>
            <div className="justify-start text-zinc-900 text-base font-medium font-['Figtree'] leading-normal">
              Data Processing
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-gray-500 text-base font-normal font-['Figtree'] leading-normal">
              Status
            </div>
            <Badge
              variant={
                clusterDetail.status === "ACTIVE" ? "success" : "processing"
              }
            >
              {clusterDetail.status === "ACTIVE" ? "Active" : "Processing"}
            </Badge>
          </div>
          {renderControlSection()}
        </div>
      </div>
    </div>
  );
};

export default ClusterDetail;
