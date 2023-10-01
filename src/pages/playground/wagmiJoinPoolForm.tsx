import { useContractWrite, useAccount } from 'wagmi'
import { encodePacked } from 'viem'
import balancerVaultAbi from '@/abis/balancerVault'

type String0x = `0x${string}`

type JoinPoolArgs = {
  poolId: String0x
  sender: String0x
  recipient: String0x
  joinPoolArgs: {
    assets: String0x[]
    maxAmountsIn: bigint[]
    userData: String0x
    fromInternalBalance: boolean
  }
}

const VAULT_ADDRESS = '0xBA12222222228d8Ba445958a75a0704d566BF2C8'
const DUMMY_ADDRESS = '0x0000000000000000000000000000000000000000' // Fallback if the user is not connected

export default function JoinPool() {
  const { address } = useAccount()
  const joinArgs: JoinPoolArgs = {
    // pool address: 0x76Ddf9dBdE56360d514a06a54d58977f77f176ca
    poolId:
      '0x76DDF9DBDE56360D514A06A54D58977F77F176CA00020000000000000000002D',
    sender: address ?? DUMMY_ADDRESS,
    recipient: address ?? DUMMY_ADDRESS,
    joinPoolArgs: {
      assets: [
        '0x2691eB285be76e43755bD05A6b7BeE808202AC20', // SGT
        '0xaD023F6B2e8490fFd51066A7f1e6C086877b27E4', // BAL
      ],
      maxAmountsIn: [1n, 0n], // 1 SGT in Wei (assuming 18 decimals), 0 BAL
      userData: encodePacked(['uint256', 'uint256', 'uint256'], [1n, 1n, 0n]), // Additional data if any
      fromInternalBalance: false,
    },
  }

  const { data, error, isLoading, isSuccess, isError, write } =
    useContractWrite({
      address: VAULT_ADDRESS,
      abi: balancerVaultAbi,
      functionName: 'joinPool',
      value: 0n,
      args: [
        joinArgs.poolId,
        joinArgs.sender,
        joinArgs.recipient,
        joinArgs.joinPoolArgs,
      ],
    })

  if (!address) return <div>no address, press Connect first</div>
  return (
    <div className="text-white px-4">
      <div>data: {myStringify(data)}</div>
      <div>
        error:
        {error === null ? undefined : (
          <pre className="bg-gray-800 p-2 rounded font-mono text-xs max-h-[384px] max-w-3xl whitespace-pre-wrap break-words overflow-y-auto">
            {myStringify(error)}
          </pre>
        )}
      </div>
      <div>isLoading: {isLoading}</div>
      <div>isSuccess: {isSuccess}</div>
      <div>isError: {isError}</div>
      <div>
        TestEncode:{' '}
        <pre className="bg-gray-800 p-2 rounded font-mono text-xs max-h-[384px] max-w-3xl whitespace-pre-wrap break-words overflow-y-auto">
          {joinArgs.joinPoolArgs.userData}
        </pre>
      </div>
      <button
        onClick={() => write()}
        className="bg-accentAction px-4 py-2 text-white font-semibold rounded mt-2"
      >
        Write
      </button>
    </div>
  )
}

function myStringify(obj: any) {
  return JSON.stringify(
    obj,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    2
  )
}
