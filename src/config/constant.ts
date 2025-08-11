import { format } from "date-fns";


export const BID_MARKETPLACE_CONTRACT_ADDRESS = '0x3Cbb48bCe9b6Ab3cb49f314dcD39bE83a1bd0e30'
export const GRAPHQL_URL = 'https://subnet-graph.u2u.xyz/subgraphs/name/subnet/market'
export const SUBNET_APPS_URL = 'https://raw.githubusercontent.com/unicornultrafoundation/subnet-apps/refs/heads/main/index.json'

export const RENTING_TIMES: Record<string, string> = {
  "1d": "1 day",
  "3d": "3 days",
  "1w": "1 week",
  "2w": "2 weeks",
  "1m": "1 month",
  "3m": "3 months",
  "6m": "6 months",
  "1y": "1 year",
};


export function formatDateWithTime(date?: Date, timeStr?: string): string {
  if (!date || !timeStr) return "--";
  
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  const combined = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours || 0,
    minutes || 0,
    seconds || 0
  );
  
  return isNaN(combined.getTime()) ? "--" : format(combined, "MMMM d, yyyy - HH:mm:ss");
}
