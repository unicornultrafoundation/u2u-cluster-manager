import { useEffect, useState } from "react"
import {ProviderOffer} from "@/types/machine.ts";

interface Props {
  page: number
  limit: number
}

export const useProviderOffers = ({ page, limit }: Props) => {
  const [data, setData] = useState<ProviderOffer[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState<number>(0)
  
  useEffect(() => {
    setIsLoading(true)
    
    const timeout = setTimeout(() => {
      try {
        const allMockData: ProviderOffer[] = Array.from({ length: 25 }, (_, i) => ({
          id: `offer-${i + 1}`,
          providerName: "U2DPN",
          providerAddress: `0x34b...${i.toString().padStart(4, "0")}`,
          price: 10 + i,
          currency: "U2U",
          system: {
            cpu: `${4 + (i % 4)} Cores`,
            ram: `${8 + (i % 5) * 4} GB`,
            disk: `${256 + (i % 4) * 256} GB`,
            uploadMb: `${50 + i * 2} Mb/s`,
            downloadMb: `${25 + i * 2} Mb/s`,
          },
          status: "available",
        }))
        
        const start = (page - 1) * limit
        const end = start + limit
        const pagedData = allMockData.slice(start, end)
        
        setData(pagedData)
        setTotal(allMockData.length)
        setIsLoading(false)
      } catch (err) {
        setError(err as Error)
        setIsLoading(false)
      }
    }, 500)
    
    return () => clearTimeout(timeout)
  }, [page, limit])
  
  return {
    providerOffers: data,
    total,
    isLoading,
    error,
  }
}
