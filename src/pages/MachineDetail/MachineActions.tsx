import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {RiCloseLine,} from "@remixicon/react";
import CANCEL_ORDER_ILLUS from "@/assets/cluster_detail_page/cancel_order_illus.png";
import {useState} from "react";
import {toast} from "sonner";
import {useCancelOrder} from "@/hooks/useCancelOrder.ts";
import EditResource from "@/pages/MachineDetail/EditResource.tsx";
import ExtendTime from "@/pages/MachineDetail/ExtendTime.tsx";
import {Order} from "@/types";

interface Props {
  orderDetail?: Order;
  refetch: () => void;
  id?: string;
}

export default function MachineActions({
                                         orderDetail,
                                         refetch,
                                         id
                                       }: Props) {
  const [openCancelOrderDialog, setOpenCancelOrderDialog] = useState(false);
  const {cancelOrder, isPending, error: cancelOrderError} = useCancelOrder()
  
  if(orderDetail?.status !== "Accepted") return null;
  
  async function handleCancelOrder() {
    try {
      await cancelOrder(id as string)
      refetch()
      setOpenCancelOrderDialog(false);
      toast.success('Cluster cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel cluster', {
        description: `Failed to cancel cluster. Error: ${error || cancelOrderError}`,
      });
    }
  }
  
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-4 w-full mt-6">
      {/* Edit Resources Sheet */}
      <EditResource orderDetail={orderDetail}/>
      {/* Extend Time Dialog */}
      <ExtendTime orderDetail={orderDetail}/>
      {/* Cancel Process Dialog */}
      <Dialog
        open={openCancelOrderDialog}
        onOpenChange={setOpenCancelOrderDialog}
      >
        <DialogTrigger asChild>
          <Button variant="destructive" className="flex-1 flex" disabled={isPending}>
            <RiCloseLine className="w-6 h-6 text-white"/>
            <span className="ml-2 text-white text-base font-semibold font-['Figtree']">
              Cancel process
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center items-center gap-4">
              <img
                src={CANCEL_ORDER_ILLUS}
                alt="cancel_order_illus"
                className="w-28 h-28"
              />
            </div>
            <div className="self-stretch inline-flex flex-col justify-start items-center gap-3">
              <DialogTitle>
                <div className="text-zinc-900 text-2xl font-normal font-['Pixelyze'] uppercase leading-loose">
                  cancel order
                </div>
              </DialogTitle>
              <DialogDescription className="text-center text-gray-500 text-base font-medium font-['Figtree']">
                Are you sure you want to cancel this order? We will refund your payment once you confirm canceling
                this order.
              </DialogDescription>
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                disabled={isPending}
                variant="destructive"
                className="flex-1 w-full"
                onClick={handleCancelOrder}
              >
                Yes
              </Button>
              <Button
                variant="secondary"
                className="flex-1 w-full"
                onClick={() => setOpenCancelOrderDialog(false)}
              >
                No
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
