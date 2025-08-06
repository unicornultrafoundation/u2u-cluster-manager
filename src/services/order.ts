import {GRAPHQL_URL} from '@/config/constant';
import {gql, request} from 'graphql-request'

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

const GET_ORDER_BY_OWNER = gql`
  query GetOrderByOwner($owner: String!,  $first: Int, $skip: Int,) {
    orders(first: $first, orderDirection: desc, skip: $skip , where: { owner: $owner }) {
      ${ORDER_FIELD}
    }
  }
`

export const getOrderByOwner = async (owner: string, first?: number, skip?: number) => {
  const rs = await request(
    GRAPHQL_URL,
    GET_ORDER_BY_OWNER,
    {owner, first, skip}
  )
  return rs;
}


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