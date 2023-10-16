import { useAccount, useBalance } from 'wagmi'
import DashBox from '../../generics/DashBox'
import { AddLiquidityModal, LockToGetVeSGTModal } from '../../generics/Modal'
import sgtDeployments from '@/constants/contracts/sgtDeployments'
import formatBigInt from '@/utils/numberFormatting/formatBigInt'
import { useVeSGTBalance } from '@/hooks/contract/useVeSGTBalance'
import useBlockTimestamp from '@/hooks/lock/useBlockTimestamp'
import { useTotalVeSGT } from '@/hooks/contract/useTotalVeSGT'
import { useLockedBalance } from '@/hooks/lock/useLockedBalance'
import { useTotalSGT } from '@/hooks/contract/useTotalSGT'
import { useLockedEnd } from '@/hooks/lock/useLockedEnd'
import { formatDistance } from 'date-fns'

export default function InfoGrid() {
  const { address } = useAccount()
  const { data: b8020Balance } = useBalance({
    address: address,
    token: sgtDeployments['B-80-BAL-20-SGT'],
  })
  const { amount: veSGTBalance } = useVeSGTBalance({
    userAddress: address || `0x`,
    enabled: typeof address === `string` && address.length === 42,
  })

  const timestamp = useBlockTimestamp()
  const { amount: totalVeSGT } = useTotalVeSGT({
    blockTimestamp: timestamp || 0n,
    enabled: !!timestamp,
  })
  const percentageOfTotalVeSGT =
    veSGTBalance !== undefined && totalVeSGT !== undefined && totalVeSGT !== 0n
      ? (veSGTBalance / totalVeSGT) * 100n
      : 0n
  const stringifiedPercentageOfTotalVeSGT =
    percentageOfTotalVeSGT.toString() + '%' + ' of all veSGT'

  const { amount: sgtLockedForUser } = useLockedBalance({
    contractAddress: sgtDeployments.VotingEscrow,
    userAddress: address || `0x`,
    enabled: typeof address === `string` && address.length === 42,
  })

  const { amount: totalSGT } = useTotalSGT({
    blockTimestamp: timestamp || 0n,
    enabled: !!timestamp,
  })
  const percentageOfTotalSGT =
    sgtLockedForUser !== undefined && totalSGT !== undefined && totalSGT !== 0n
      ? (sgtLockedForUser / totalSGT) * 100n
      : 0n

  const { unixEndDate } = useLockedEnd({
    contractAddress: sgtDeployments.VotingEscrow,
    userAddress: address || `0x`,
    enabled: typeof address === `string` && address.length === 42,
  })

  return (
    <div className="grid grid-cols-3 gap-6">
      <DashBox
        title="My veSGT"
        mainValue={
          veSGTBalance !== undefined ? formatBigInt(veSGTBalance) : '-'
        }
        subValue={stringifiedPercentageOfTotalVeSGT}
      />
      <DashBox title="SGT locked" mainValue="-" subValue="-% SGT supply" />
      <DashBox title="My boost" mainValue="-" subValue="- years average lock" />
      <AddLiquidityModal>
        <DashBox
          title="My B-80SGT-20WETH"
          mainValue="$0.00"
          subValue={b8020Balance ? formatBigInt(b8020Balance?.value) : '-'}
          onClick={() => {}}
          grayTone="Light"
          verticalPadding="Bigger"
        />
      </AddLiquidityModal>
      <LockToGetVeSGTModal>
        <DashBox
          title="My locked  B-80SGT-20WETH"
          mainValue="$-"
          subValue="-"
          onClick={() => {}}
          grayTone="Light"
          verticalPadding="Bigger"
        />
      </LockToGetVeSGTModal>
      <LockToGetVeSGTModal>
        <DashBox
          title="Locked Until"
          mainValue={new Date(
            Number((unixEndDate ?? 0n) * 1000n)
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
          subValue={
            'in ' +
            formatDistance(
              new Date(Number((unixEndDate ?? 0n) * 1000n)),
              new Date()
            )
          }
          onClick={() => {}}
          grayTone="Light"
          verticalPadding="Bigger"
        />
      </LockToGetVeSGTModal>

      <DashBox
        title="Total veSGT"
        mainValue={totalVeSGT !== undefined ? formatBigInt(totalVeSGT) : '-'}
      />

      <DashBox
        title="My locked SGT"
        mainValue={
          sgtLockedForUser !== undefined ? formatBigInt(sgtLockedForUser) : '-'
        }
      />
      <DashBox
        title="Total SGT"
        mainValue={totalSGT !== undefined ? formatBigInt(totalSGT) : '-'}
      />
    </div>
  )
}
