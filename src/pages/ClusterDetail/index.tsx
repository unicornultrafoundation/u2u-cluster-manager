import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CANCEL_ORDER_ILLUS from "@/assets/cluster_detail_page/cancel_order_illus.png";
import ILLUS from "@/assets/cluster_detail_page/illus.png";
import STAT_BG from "@/assets/cluster_detail_page/stat_bg.png";
import STAT_BG_MOBILE from "@/assets/cluster_detail_page/stat_bg_mobile.png";
import {RiFileCopyLine, RiShutDownFill, RiEditBoxFill, RiTimerFlashFill, RiFlashlightFill} from '@remixicon/react'
import { useClusterDetail } from "@/hooks/useClusterDetail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCancelOrder } from "@/hooks/useCancelOrder";
import { useMachineStatus } from "@/hooks/useMachineStatus";

const ClusterDetail = () => {
  const { id } = useParams();
  const { clusterDetail, isLoading, error, refetch } = useClusterDetail(id as string);
  const { cancelOrder, isPending, error: cancelOrderError } = useCancelOrder()
  const { machineStatus } = useMachineStatus(clusterDetail?.acceptedMachine?.publicIp || "");

  const [openCancelOrderDialog, setOpenCancelOrderDialog] = useState(false)

  useEffect(() => {
    if (clusterDetail) {
      console.log(clusterDetail);
    }
  }, [clusterDetail]);

  async function handleCancelOrder() {
    try {
      await cancelOrder(id as string)
      await refetch()
      setOpenCancelOrderDialog(false);
      toast.success('Cluster cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel cluster', {
        description: `Failed to cancel cluster. Error: ${error || cancelOrderError}`,
      });
    }
  }

  function renderControlSection() {
    if (!clusterDetail) return null;
    if (clusterDetail.status === "Created") {
      return (
        <Dialog open={openCancelOrderDialog} onOpenChange={setOpenCancelOrderDialog}>
          <DialogTrigger asChild>
            <Button
              variant="destructive" className="flex-1 flex w-full"
              disabled={isPending}
            >
              <div className="text-center justify-center text-stone-50 text-base font-semibold font-['Figtree'] leading-normal">Cancel order</div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
              <DialogDescription>
                <div className="flex justify-center items-center gap-4">
                  <img src={CANCEL_ORDER_ILLUS} alt="cancel_order_illus" className="w-28 h-28" />
                </div>
                <div className="self-stretch inline-flex flex-col justify-start items-center gap-3">
                  <div className="justify-start text-zinc-900 text-2xl font-normal font-['Pixelyze'] uppercase leading-loose">cancel order</div>
                  <div className="self-stretch text-center justify-start text-gray-500 text-base font-medium font-['Figtree'] leading-normal">Are you sure you want to cancel this order? We will refund your payment once you confirm canceling this order.</div>
                </div>
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button disabled={isPending} variant="destructive" className="flex-1 flex w-full" onClick={handleCancelOrder}>
                    <div className="text-center justify-center text-stone-50 text-base font-semibold font-['Figtree'] leading-normal">Yes</div>
                  </Button>
                  <Button variant="secondary" className="flex-1 flex w-full" onClick={() => setOpenCancelOrderDialog(false)}>
                    <div className="text-center justify-center text-neutral-600 text-base font-semibold font-['Figtree'] leading-normal">No</div>
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }
    if (clusterDetail.status === "Cancelled") {
      return (
        <Button disabled variant="secondary" className="flex-1 flex w-full">
          Cancelled
        </Button>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-4 w-full">
        <Button variant="secondary" className="flex-1 flex">
          {machineStatus === "Active" ? <RiShutDownFill className="w-6 h-6 text-neutral-400" /> : <RiFlashlightFill className="w-6 h-6 text-neutral-400" />}
          <div className="h-6 flex justify-center items-center gap-2">
            <div className="text-center justify-center text-neutral-600 text-base font-semibold font-['Figtree'] leading-normal">
              {machineStatus === "Active" ? "Turn OFF" : "Turn ON"}
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

  if (isLoading || !clusterDetail) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="self-stretch w-full pt-12 pb-24 px-4 inline-flex justify-center items-start gap-16 overflow-hidden bg-stone-50">
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
            <BreadcrumbPage>Order Detail</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="self-stretch flex flex-col justify-center items-start gap-4">
          <img src={ILLUS} alt="illus" className="w-28 py-5 px-2" />
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-zinc-900 text-2xl font-normal font-['Pixelyze'] uppercase leading-loose">
              {clusterDetail.status === "Created"
                ? "Active cluster"
                : clusterDetail.status === "Accepted"
                  ? "Cluster is being created..."
                  : clusterDetail.status === "Cancelled"
                    ? "Cancelled"
                    : "Cluster is being created..."}
            </div>
            <div className="justify-start text-gray-500 text-sm font-normal font-['Figtree'] leading-normal">
              {clusterDetail.status === "Created"
                ? "This cluster is currently activated"
                : clusterDetail.status === "Accepted"
                  ? "Please wait for your order to be completed"
                  : clusterDetail.status === "Cancelled"
                    ? "The order has been cancelled"
                    : "Please wait for your order to be completed"}
            </div>
          </div>
        </div>
        <div
          className="self-stretch p-4 md:p-6 relative bg-white grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 overflow-hidden"
        >
          <div className="w-full h-56 md:h-28 left-0 top-0 absolute">
            <div className="w-[768px] hidden md:inline-flex left-0 top-[100px] bg-white absolute justify-start items-center gap-1">
              <div className="flex-1 h-2 bg-neutral-600" />
              <div className="flex-1 h-2 bg-neutral-600" />
            </div>
            <img src={STAT_BG} alt="stat_bg" className="w-full hidden md:block" />
            <img src={STAT_BG_MOBILE} alt="stat_bg_mobile" className="w-full h-full block md:hidden" />
          </div>
          <div className="flex-1 z-10 relative h-12 inline-flex flex-col justify-start items-center gap-1">
            <div className="justify-center text-gray-500 text-sm font-semibold font-['Figtree'] uppercase leading-normal tracking-wide">
              Total CPU cores
            </div>
            <div className="justify-center text-white text-xl font-normal font-['Pixelyze'] uppercase leading-loose">
              {clusterDetail.cpuCores} Cores
            </div>
          </div>
          <div className="flex-1 z-10 relative h-12 inline-flex flex-col justify-start items-center gap-1">
            <div className="justify-center text-gray-500 text-sm font-semibold font-['Figtree'] uppercase leading-normal tracking-wide">
              Total RAM memory
            </div>
            <div className="justify-center text-white text-xl font-normal font-['Pixelyze'] uppercase leading-loose">
              {clusterDetail.memoryMB} GB
            </div>
          </div>
          <div className="flex-1 z-10 relative h-12 inline-flex flex-col justify-start items-center gap-1">
            <div className="justify-center text-gray-500 text-sm font-semibold font-['Figtree'] uppercase leading-normal tracking-wide">
              Total GPU memory
            </div>
            <div className="justify-center text-white text-xl font-normal font-['Pixelyze'] uppercase leading-loose">
              {clusterDetail.gpuMemory} GB
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
              Cluster's name
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
          
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-gray-500 text-base font-normal font-['Figtree'] leading-normal">
              Status
            </div>
            <Badge
              variant={
                clusterDetail.status === "Created" ? "success" : "processing"
              }
            >
              {clusterDetail.status}
            </Badge>
          </div>
          {renderControlSection()}
        </div>
      </div>
    </div>
  );
};

export default ClusterDetail;
