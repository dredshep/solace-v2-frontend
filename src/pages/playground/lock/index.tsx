import sepoliaDefaultPool from '@/constants/pools/sepoliaDefaultPool'
import { useAccount, useBalance } from 'wagmi'
import { useLockIntoVotingEscrow } from '@/hooks/lock/useLockIntoVotingEscrow'
import { ValidatedInput } from '@/components/new/lockPlayground/ValidatedInput'
import useBlockTimestamp from '@/hooks/lock/useBlockTimestamp'
import { useEffect } from 'react'
import AllowanceAndBalanceTable from '@/components/new/lockPlayground/AllowanceAndBalanceTable'
import { useApproveToken } from '@/hooks/lock/useApproveToken'
import { useAllowance } from '@/hooks/lock/useAllowance'
import sgtDeploymentAddresses from '@/constants/contracts/sgtDeployments'
import { MaxInt256 } from 'ethers'
import classnames from 'classnames'
import Image from 'next/image'

export default function Lock() {
  const timestamp = useBlockTimestamp()
  const bigintTimestampUnix = BigInt(timestamp ?? 0n)
  const secondsInWeek = 604800n
  const currentWeekNumber =
    bigintTimestampUnix - (bigintTimestampUnix % secondsInWeek)
  // Set unlock time for 20 weeks into the future
  const unlockTime = currentWeekNumber + 20n * secondsInWeek

  const { data, write, isLoading, isSuccess } = useLockIntoVotingEscrow({
    amount: 1000n,
    unlockTime,
    enabled: !!timestamp,
  })

  const { address } = useAccount()

  const {
    data: dataApprove,
    write: writeApprove,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
  } = useApproveToken({
    amount: MaxInt256,
    owner: address ?? `0x`,
    spender: sgtDeploymentAddresses.VotingEscrow,
    enabled: typeof address === `string` && address.length === 42,
  })

  const { allowance, refetch } = useAllowance({
    spender: sgtDeploymentAddresses.VotingEscrow,
    owner: address || `0x`,
    tokenAddress: sgtDeploymentAddresses['B-80-BAL-20-SGT'],
    enabled: typeof address === `string` && address.length === 42,
  })

  // with useeffect, refetch with allowance as dependency
  useEffect(() => {
    if (isSuccessApprove === true) refetch()
  }, [isSuccessApprove, refetch])

  const { data: balance, refetch: refetchBalance } = useBalance({
    address: address,
    token: sgtDeploymentAddresses['B-80-BAL-20-SGT'],
  })

  useEffect(() => {
    if (isSuccess === true) refetchBalance()
  }, [isSuccess, refetchBalance])

  useEffect(() => {
    console.log('current week number: ', currentWeekNumber)
    console.log('unlock time: ', unlockTime)
  }, [currentWeekNumber, unlockTime])

  const needsAllowance =
    allowance !== undefined &&
    balance !== undefined &&
    allowance < balance?.value

  return (
    <div className="mx-4 flex flex-col items-center justify-center h-screen bg-background">
      <div className="w-full max-w-md p-4 rounded-lg bg-backgroundInteractive shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-accent font-semibold">
            Voting Escrow Lock
          </h1>
          <div className="p-1 rounded-full bg-accent">
            <svg
              className="w-6 h-6 text-background"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13 6a3 3 0 00-6 0v4h6V6zM2 6a10.978 10.978 0 013.528-8C2.68 1.33 0 4.78 0 9a9 9 0 0018 0c0-4.22-2.68-7.67-5.528-9A10.978 10.978 0 012 6h13V5H2v1z"></path>
            </svg>
          </div>
        </div>

        <ValidatedInput poolAddress={sepoliaDefaultPool.address} />
        <AllowanceAndBalanceTable
          allowance={allowance}
          balance={balance?.value}
        />
        <div className="flex mt-4 gap-4">
          {/* {
            // needsAllowance ?
            // ( */}
          <button
            onClick={() => writeApprove?.()}
            disabled={isLoadingApprove}
            className={classnames(
              'w-64 px-4 py-2',
              'text-white rounded-lg',
              isLoadingApprove ? 'bg-gray' : 'bg-gray hover:brightness-110',
              'font-semibold'
            )}
          >
            {isLoadingApprove ? (
              <span className="flex gap-2 items-center font-semibold">
                <Image
                  src="/assets/svg/loading.svg"
                  alt="loading"
                  className="inline-block w-5 h-5"
                  width={30}
                  height={20}
                />
                Approving...
              </span>
            ) : (
              'Edit Allowance'
            )}
          </button>
          {/* // )
          // : null} */}

          {
            // Show "Create Lock" button only when `needsAllowance` is false and the lock has not succeeded
            // !needsAllowance ?
            <button
              onClick={() => write?.()}
              disabled={isLoading}
              className={classnames(
                'px-4 py-2 w-64',
                'text-white rounded-lg font-semibold',
                isLoading
                  ? 'bg-gray-500'
                  : 'bg-accentAction hover:bg-accentActive'
              )}
            >
              {isLoading ? (
                <span className="flex gap-2 items-center">
                  <Image
                    src="/assets/svg/loading.svg"
                    alt="loading"
                    className="inline-block w-5 h-5"
                    width={30}
                    height={20}
                  />
                  Locking...
                </span>
              ) : (
                'Deposit to lock'
              )}
            </button>
            // : null
          }
        </div>
      </div>
    </div>
  )
}
