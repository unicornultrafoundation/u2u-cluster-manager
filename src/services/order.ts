import { GRAPHQL_URL } from '@/config/constant';
import { gql, request } from 'graphql-request'

const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    order(id: $id) {
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
        id
        name
        owner
        description
      }
      acceptedMachine {
        id
        name
        machineId
        machineType
        bids {
          id
          pricePerSecond
        }
      }
      startAt
      expiredAt
      lastPaidAt
      transactionHash
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