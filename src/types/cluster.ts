import { Machine } from "./machine"
import {Bid} from "@/types/bid.ts";

export interface Order {
  id: string
  name: string
  status: 'Created' | 'Accepted' | 'Closed' | 'Cancelled'
  machineType: 'Docker' | 'Kubernetes' | 'Kvm'
  region?: string
  cpuCores: number
  gpuCores: number
  gpuMemory: number
  memoryMB: number
  diskGB: number
  uploadMbps: number
  downloadMbps: number
  specs: string
  acceptedBidPrice: bigint
  // acceptedProvider: string | null
  acceptedMachine: Machine | null
  
  bids: Bid[] | null
  startAt: Date | null
  expiredAt: Date | null
  lastPaidAt: Date | null
  transactionHash: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ClusterStats {
  totalClusters: number
  activeNodes: number
  cpuUsage: number
  alerts: number
}

export interface ResourceUsage {
  cpu: number
  memory: number
  storage: number
}


export interface Application {
  id: number;
  symbol: string;
  name: string;
  description: string;
  logo: string;
  banners_urls: string[];
  default_banner_index: number;
  website: string;
  machine_type: number;
  manifest: Manifest;
}

interface Manifest {
  version: string;
  services: Services;
  profiles: Profiles;
  deployment: Deployment;
  endpoints: Endpoints;
}

interface Endpoints {
  minio: Minio3;
}
interface Minio3 {
  kind: string;
}
interface Deployment {
  minio: Minio2;
}
interface Minio2 {
  profile: string;
  count: number;
}
interface Profiles {
  compute: Compute;
}
interface Compute {
  default: Default;
}
interface Default {
  resources: Resources2;
}
interface Resources2 {
  cpu: Cpu2;
  memory: Cpu2;
  storage: Storage2[];
}
interface Storage2 {
  name: string;
  size: string;
  attributes: Attributes;
}
interface Attributes {
  persistent: boolean;
}
interface Cpu2 {
  request: string;
  limit: string;
}
interface Services {
  minio: Minio;
}
interface Minio {
  image: string;
  command: string[];
  env: string[];
  expose: Expose[];
  params: Params;
  count: number;
  resources: Resources;
}
interface Resources {
  cpu: Cpu;
  memory: Memory;
  storage: Memory;
}
interface Memory {
  size: Units;
}
interface Cpu {
  units: Units;
}
interface Units {
  value: number;
  unit: string;
}
interface Params {
  storage: Storage;
  health: Health;
}
interface Health {
  readiness: Readiness;
}
interface Readiness {
  http: Http;
  initial_delay_seconds: number;
  period_seconds: number;
  timeout_seconds: number;
  success_threshold: number;
  failure_threshold: number;
}
interface Http {
  path: string;
  port: number;
}
interface Storage {
  shm: Shm;
}
interface Shm {
  mount: string;
}
interface Expose {
  port: number;
  as: number;
  proto: string;
  to: To[];
}
interface To {
  global: boolean;
}