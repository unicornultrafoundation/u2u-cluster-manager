import {useEffect, useState} from "react";
import {Payment, PaymentFilter} from "@/types/payment.ts";

export interface PaymentHistoryParams {
  filters: PaymentFilter;
}

export interface PaymentHistoryResult {
  data: Payment[];
  totalItems: number;
}

export function usePaymentHistory(props: PaymentHistoryParams): PaymentHistoryResult {
  const {filters} = props
  const [data, setData] = useState<Payment[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  
  useEffect(() => {
    setTimeout(() => {
      const filtered = new Array(10).fill(0).map((_, i) => ({
        
        id: (i + 1).toString(),
        machineId: `machine-${i}`,
        txHash: `0x000000${Math.random().toString(16).slice(2, 10)}`,
        application: "U2DPN",
        type: ["Processing", "Success", "Cancel"][i % 4] as Payment["type"],
        total: `10${i}`,
        transactionHash: `0xabc123${i}`,
        createdAt: new Date(),
      }));
      
      setTotalItems(filtered.length);
      setData(filtered);
    }, 300);
  }, [filters]);
  
  return {
    data,
    totalItems,
  };
}
