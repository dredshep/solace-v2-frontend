import React from 'react'
import { useAccount, useBalance } from 'wagmi'
import { formatEther } from 'viem'

export default function MyBalance() {
  const { address, isConnecting, isDisconnected } = useAccount()

  // The SGT token address
  const SGT_TOKEN_ADDRESS = '0x2691eB285be76e43755bD05A6b7BeE808202AC20'
  // Fetch balance
  const balance = useBalance({
    address: address,
    token: SGT_TOKEN_ADDRESS,
  })

  if (!address) return <div>Not connected</div>
  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>

  // Display connection status and balance
  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>
  return (
    <div className="px-4 text-white">
      <div>Address: {address}</div>
      <div>Balance: {formatEther(balance.data?.value || 0n)}</div>
    </div>
  )
}
