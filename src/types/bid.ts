import {Machine} from "@/types/machine.ts";

export interface Bid {
  id: string;
  status: string;
  owner: string;
  bidIndex: string;
  acceptedBidPrice: string
  machine: Machine;
}