import { GRAPHQL_URL } from '@/config/constant';
import { gql, request } from 'graphql-request'

const MACHINE_FIELD = gql`
  id
  name
  machineId
  machineType
  publicIp
  overlayIp
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
    { id }
  )
  return rs;
}

const GET_ORDER_BY_OWNER = gql`
  query GetOrderByOwner($owner: String!) {
    orders(where: { owner: $owner }) {
      ${ORDER_FIELD}
    }
  }
`

export const getOrderByOwner = async (owner: string) => {
  const rs = await request(
    GRAPHQL_URL,
    GET_ORDER_BY_OWNER,
    { owner }
  )
  return rs;
}