import {Pagination} from "@/types/ui.ts";

export interface Deposit {
  id: string
  txHash: string
  from: string
  to: string
  totalSpent: number
  status: 'Processing' | 'Success' | 'Cancel'
  transactionHash: string
  createdAt?: Date
}

export interface DepositFilter extends Pagination {
  status?: string;
  date?: number;
  orderBy?: string;
  search?: string,
}