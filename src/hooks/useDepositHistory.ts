import {useEffect, useState} from "react";
import {Deposit, DepositFilter} from "@/types";

export interface DepositHistoryParams {
  filters: DepositFilter;
}

export interface DepositHistoryResult {
  data: Deposit[];
  totalItems: number;
}

export function useDepositHistory(props: DepositHistoryParams): DepositHistoryResult {
  const { filters} = props
  const [data, setData] = useState<Deposit[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  
  console.log(filters,"---")
  
  useEffect(() => {
    setTimeout(() => {
      const filtered = new Array(10).fill(0).map((_, i) => ({
        id: (i + 1).toString(),
        txHash: `0x000000${Math.random().toString(16).slice(2, 10)}`,
        status: ["Processing", "Success", "Cancel"][i % 4] as Deposit["status"],
        from: `0x1234567890abcdef${i}`,
        to: `0xabcdef1234567890${i}`,
        totalSpent: Math.floor(Math.random() * 1000) + 1,
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
