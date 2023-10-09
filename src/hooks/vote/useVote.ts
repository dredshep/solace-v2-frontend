import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import gaugeControllerAbi from '@/abis/gaugeControllerAbi' // Make sure to include the GaugeController ABI
import sgtDeploymentAddresses from '@/constants/contracts/sgtDeployments'
import String0x from '@/constants/types/String0x'

type UseVoteProps = {
  gaugeAddress: String0x
  userWeight: bigint // Should be less than or equal to 10000
  enabled?: boolean
}

export function useVote({
  gaugeAddress,
  userWeight,
  enabled = true,
}: UseVoteProps) {
  const { config } = usePrepareContractWrite({
    address: sgtDeploymentAddresses.GaugeController,
    abi: gaugeControllerAbi,
    functionName: 'vote_for_gauge_weights',
    args: [
      gaugeAddress, // Gauge to vote for
      userWeight, // User weight for the vote
    ],
    enabled,
  })

  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

  return {
    data,
    write,
    isLoading,
    isSuccess,
  }
}
