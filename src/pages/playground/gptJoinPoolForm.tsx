// components/JoinPool.tsx
// import { ethers } from 'ethers';
import { useContractWrite } from 'wagmi'
import { useState } from 'react'
import balancerVaultAbi from '@/abis/balancerVault'

// interface JoinPoolArgs {
//   poolId: `0x${string}`
//   sender: `0x${string}`
//   recipient: `0x${string}`
//   // sortedTokenAddresses: string[]
//   // maxAmountsIn: string[]
//   // userData: string
//   // fromInternalBalance: boolean
// }

// type

type String0x = `0x${string}`

type JoinPoolArgs = {
  poolId: String0x
  sender: String0x
  recipient: String0x
  joinPoolArgs: {
    sortedTokenAddresses: String0x[]
    maxAmountsIn: string[]
    userData: String0x
    fromInternalBalance: boolean
  }
}

const VAULT_ADDRESS = '0xBA12222222228d8Ba445958a75a0704d566BF2C8'
export default function JoinPool(
  // joinArgs: JoinPoolArgs,
  // setErrorTooltip: (error: string) => void
) {
  // try {
  // const vault = new ethers.Contract(
  //   // balancer vault address on sepolia:
  //   VAULT_ADDRESS,
  //   // balancer vault contract abi:
  //   balancerVaultAbi,
  //   // signer:
  //   ethers.provider.getSigner()
  // );

  // const tx = await vault.joinPool(
  //   joinArgs.poolId,
  //   joinArgs.sender,
  //   joinArgs.recipient,
  //   [
  //     joinArgs.sortedTokenAddresses,
  //     joinArgs.maxAmountsIn,
  //     joinArgs.userData,
  //     joinArgs.fromInternalBalance
  //   ],
  //   { gasLimit: 6000000 }
  // );

  const joinArgs: JoinPoolArgs = {
    poolId: '0x000000000

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
        {
          assets: joinArgs.joinPoolArgs.sortedTokenAddresses,
          maxAmountsIn: joinArgs.joinPoolArgs.maxAmountsIn.map((amount) =>
            BigInt(amount)
          ),
          userData: joinArgs.joinPoolArgs.userData,
          fromInternalBalance: joinArgs.joinPoolArgs.fromInternalBalance,
        },
      ],
    })

  return (
    <div>
      <div>data: {JSON.stringify(data)}</div>
      <div>error: {JSON.stringify(error)}</div>
      <div>isLoading: {isLoading}</div>
      <div>isSuccess: {isSuccess}</div>
      <div>isError: {isError}</div>
      <button
        onClick={() => write()}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Write
      </button>
    </div>
  )

  // return tx
  // } catch (error) {
  //   setErrorTooltip(error.message)
  // }
}

// export default function JoinPoolForm() {
//   const [poolId, setPoolId] = useState('')
//   const [errorTooltip, setErrorTooltip] = useState('')

//   const handleSubmit = async () => {
//     const joinArgs: JoinPoolArgs = {
//       // Fill this object with form values
//       poolId,
//       // ...
//     }
//     const tx = await joinPool(joinArgs, setErrorTooltip)
//     if (tx) {
//       // Handle success here
//     }
//   }

//   return (
//     <div>
//       <h1>Join Pool</h1>
//       <div className="relative">
//         <input
//           type="text"
//           value={poolId}
//           onChange={(e) => setPoolId(e.target.value)}
//           placeholder="Pool ID"
//           className="border p-2"
//         />
//         {errorTooltip && (
//           <div className="absolute text-xs text-white bg-red-500 p-1 rounded">
//             {errorTooltip}
//           </div>
//         )}
//       </div>
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white p-2 rounded mt-2"
//       >
//         Join
//       </button>
//     </div>
//   )
// }
