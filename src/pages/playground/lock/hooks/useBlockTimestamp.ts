import { useState, useEffect } from 'react'
import { usePublicClient } from 'wagmi'

export default function useBlockTimestamp() {
  const [timestamp, setTimestamp] = useState<bigint | undefined>(undefined)
  const publicClient = usePublicClient()

  useEffect(() => {
    const fetchData = async () => {
      const block = await publicClient.getBlock()
      setTimestamp(block.timestamp)
    }

    fetchData()
  }, [publicClient])

  return timestamp
}
