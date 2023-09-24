import React, { useState, useEffect } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { BigNumber } from '@ethersproject/bignumber'
// Assuming Balancer SDK and its relevant contracts are imported
import { BalancerSDK, BalancerSdkConfig, Network } from '@balancer-labs/sdk'
import { BigNumberish } from 'ethers'

const config: BalancerSdkConfig = {
  network: Network.SEPOLIA,
  rpcUrl: `https://rpc2.sepolia.org`,
}
const sdk = new BalancerSDK(config)

const { balancerContracts } = sdk

function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint'
}

function BigNumberFromBigInt(value: bigint): BigNumber {
  return value as unknown as BigNumber
}

type queryJoinParams = [
  poolId: string,
  sender: string,
  recipient: string,
  request: {
    assets: string[]
    maxAmountsIn: BigNumber[]
    userData: string
    fromInternalBalance: boolean
  }
]

export default function AddLiquidityPage() {
  const { address, isConnecting, isDisconnected } = useAccount()

  // The SGT token address
  const SGT_TOKEN_ADDRESS = '0x2691eB285be76e43755bD05A6b7BeE808202AC20'
  // Fetch balance
  const balance = useBalance({
    address: address,
    token: SGT_TOKEN_ADDRESS,
  })

  const [amountToJoin, setAmountToJoin] = useState<string>('') // to store the amount user wants to join with
  const [maxAmount, setMaxAmount] = useState<string>('') // to store the max amount user can join with
  const [query, setQuery] = useState<queryJoinParams | undefined>(undefined) // to store the query

  useEffect(() => {
    if (balance.data) {
      setMaxAmount(formatEther(balance.data.value))
    }
  }, [balance.data])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (
      !isNaN(parseFloat(value)) &&
      parseFloat(value) >= 0 &&
      parseFloat(value) <= parseFloat(maxAmount)
    ) {
      setAmountToJoin(value)
    }
  }

  const handleMaxClick = () => {
    setAmountToJoin(maxAmount)
  }

  const handleSubmit = async () => {
    if (!amountToJoin) return
    const parsedAmount = parseEther(`${parseFloat(amountToJoin)}`)
    const bigNumberAmount = isBigInt(parsedAmount)
      ? BigNumberFromBigInt(parsedAmount)
      : parsedAmount

    // Fetch pool details and simulate the join
    const pool = await sdk.pools.find(
      '0x3c13bc30b8e878c53fd2a36b679409c073afd75950be43d8858768e956fbc20e'
    )
    if (!pool)
      return (
        <div>
          Pool not found
          (0x3c13bc30b8e878c53fd2a36b679409c073afd75950be43d8858768e956fbc20e)
        </div>
      )
    const maxAmountsIn = new Map(
      pool.tokensList.map((token) => [token, bigNumberAmount])
    )

    const queryParams = pool.buildQueryJoinExactIn({
      maxAmountsInByToken: new Map(
        pool.tokensList.map((token) => {
          const amount = maxAmountsIn.get(token)
          if (!amount) {
            throw new Error(`No amount found for token ${token}`)
          }
          return [token, amount]
        })
      ),
    })
    setQuery(queryParams)
    /* {
        // assets: pool.tokensList,
        // maxAmountsIn: queryParams.maxAmountsIn,
        // userData: '0x',
        // fromInternalBalance: false,
      }*/
    // const response =
    //   await balancerContracts.contracts.balancerHelpers.queryJoin(...queryParams)
    // const { bptOut, amountsIn } = response

    // You can use bptOut and amountsIn for further actions or display
  }

  if (!address) return <div>Not connected</div>
  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>

  return (
    <div className="px-4 text-white">
      <div>Address: {address}</div>
      <div>Balance: {formatEther(balance.data?.value || 0n)}</div>
      <div>
        <input
          type="text"
          value={amountToJoin}
          onChange={handleInputChange}
          placeholder="Enter amount to join with"
        />
        <button onClick={handleMaxClick}>Max</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="mt-4">
        <div>Query: {JSON.stringify(query)}</div>
      </div>
    </div>
  )
}
