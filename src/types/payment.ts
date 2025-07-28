import {Pagination} from "@/types/ui.ts";

export interface Payment {
  id: string
  txHash: string
  machineId: string
  application: string
  total: string
  type: 'Processing' | 'Success' | 'Cancel'
  createdAt?: Date
}

export interface PaymentFilter extends Pagination {
  application?: string;
  type?: string;
  date?: number;
  orderBy?: string;
  search?: string,
}