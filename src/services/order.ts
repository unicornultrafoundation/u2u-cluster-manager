import {GRAPHQL_URL} from '@/config/constant';
import {gql, request} from 'graphql-request'
import {getDayTimestamps} from "@/utils/string.ts";

const MACHINE_FIELD = gql`
  id
  name
  machineId
  machineType
  publicIp
  overlayIp
  cpuCores
  createdAt
  description
  gpuCores
  gpuMemory
  memoryMB
  uploadSpeed
  downloadSpeed
  bids {
    id
    pricePerSecond
  }
`

const PROVIDER_FIELD = gql`
  id
  name
  owner
  description
`

const BID_FIELD = gql`
  id
  owner
  pricePerSecond
  status
  createdAt
  bidIndex
  transactionHash
  provider {
    ${PROVIDER_FIELD}
  }
  machine {
    ${MACHINE_FIELD}
  }
`

const ORDER_FIELD = gql`
  id
  name
  machineType
  owner
  status
  createdAt
  duration
  minBidPrice
  maxBidPrice
  acceptedBidPrice
  region
  cpuCores
  gpuCores
  gpuMemory
  memoryMB
  diskGB
  uploadMbps
  downloadMbps
  specs
  acceptedProvider {
    ${PROVIDER_FIELD}
  }
  acceptedMachine {
    ${MACHINE_FIELD}
  }
  bids {
    ${BID_FIELD}
  }
  startAt
  expiredAt
  lastPaidAt
  transactionHash
`

const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    order(id: $id) {
      ${ORDER_FIELD}
    }
  }
`

export const getOrderById = async (id: string) => {
  const rs = await request(
    GRAPHQL_URL,
    GET_ORDER_BY_ID,
    {id}
  )
  return rs;
}

// const GET_ORDER_BY_OWNER = gql`
//   query GetOrderByOwner(
//     $owner: String!
//       $first: Int!
//       $skip: Int!
//       $orderStatus: String
//       $machineType: String
//       $createdGte: Int
//       $createdLte: Int
//       $expiredAt: Int
//       $orderBy: String!
//   ) {
//   {
//       orders(
//         where: {
//           owner: $owner
//           ${orderStatus ? `status: $orderStatus` : ''}
//           ${machineType ? `machineType: $machineType` : ''}
//           ${createdGte ? `createdAt_gte: $createdGte` : ''}
//           ${createdLte ? `createdAt_lte: $createdLte` : ''}
//           ${expiredAt ? `expiredAt: $expiredAt` : ''}
//         }
//         first: $first
//         skip: $skip
//         orderBy: $orderBy
//         orderDirection: desc
//       ) {
//         ${ORDER_FIELD}
//       }
//     }
// `

export const getOrderByOwner = async (
  owner: string,
  first: number = 10,
  skip: number = 0,
  orderStatus?: string,
  machineType?: string,
  createdAt?: number,
  expiredAt?: number,
  orderBy?: string,
) => {
  
  let createdGte: number | undefined;
  let createdLte: number | undefined;
  
  if (createdAt && !isNaN(createdAt)) {
    const date = new Date(createdAt * 1000);
    if (!isNaN(date.getTime())) {
      const [fromSec, toSec] = getDayTimestamps(date);
      createdGte = fromSec;
      createdLte = toSec;
    } else {
      console.error("Invalid Date:", createdAt);
    }
  } else {
    console.error("Invalid createdAt value:", createdAt);
  }

  const query = gql`
    query GetOrders(
      $owner: String!
      $first: Int!
      $skip: Int!
      $orderStatus: String
      $machineType: String
      $createdGte: Int
      $createdLte: Int
      $expiredAt: Int
      $orderBy: String
    ) {
      orders(
        where: {
          owner: $owner
          ${orderStatus ? `status: $orderStatus` : ''}
          ${machineType ? `machineType: $machineType` : ''}
          ${createdGte ? `createdAt_gte: $createdGte` : ''}
          ${createdLte ? `createdAt_lte: $createdLte` : ''}
          ${expiredAt ? `expiredAt: $expiredAt` : ''}
        }
        first: $first
        skip: $skip
        ${orderBy ? `orderBy: $orderBy` :  ''}
        orderDirection: desc
      ) {
        ${ORDER_FIELD}
      }
    }
  `;
  
  return await request(GRAPHQL_URL, query, {
    owner,
    first,
    skip,
    orderStatus,
    machineType,
    createdGte,
    createdLte,
    expiredAt,
    orderBy,
  });
};


const GET_LIST_APPLICATION = gql`
  query GetApplications() {
    order(id: $id) {
      ${ORDER_FIELD}
    }
  }
`


export const getApplications = async () => {
  const rs = await request(
    GRAPHQL_URL,
    GET_LIST_APPLICATION,
    {id: ''}
  )
  return rs;
}