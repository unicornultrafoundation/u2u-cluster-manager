import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import CANCEL_ORDER_ILLUS from "@/assets/cluster_detail_page/cancel_order_illus.png";
import {toast} from "sonner";
import {useCancelOrder} from "@/hooks/useCancelOrder.ts";

interface Props {
  refetch: () => void;
  id?: string;
  show: boolean;
  onClose: () => void;
}

export default function CancelOrder({
                                      show,
                                      onClose,
                                      refetch,
                                      id
                                    }: Props) {
  const {cancelOrder, isPending, error: cancelOrderError} = useCancelOrder()
  
  async function handleCancelOrder() {
    try {
      await cancelOrder(id as string)
      refetch()
      onClose();
      toast.success('Cluster cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel cluster', {
        description: `Failed to cancel cluster. Error: ${error || cancelOrderError}`,
      });
    }
  }
  
  
  return (
    <Dialog
      open={show}
      onOpenChange={onClose}
    >
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
              onClick={onClose}
            >
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
