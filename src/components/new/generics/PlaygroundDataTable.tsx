import String0x from '@/constants/types/String0x'
import { useAccount } from 'wagmi'

interface BaseRowData {
  label: string
  unit?: string
  title?: string
}

interface BigIntRowData extends BaseRowData {
  type: 'bigint'
  value: bigint
  formatFunc?: (val: bigint) => string
}

interface StringRowData extends BaseRowData {
  type: 'string'
  value: string
}

interface DateRowData extends BaseRowData {
  type: 'date'
  value: Date
  formatFunc?: (val: Date) => string
}

export type PlaygroundDataTableRowData =
  | BigIntRowData
  | StringRowData
  | DateRowData

type PDTProps = {
  rows: PlaygroundDataTableRowData[]
}

export default function PlaygroundDataTable({ rows }: PDTProps) {
  const { address }: { address: String0x | undefined } = useAccount()
  const lastIndex = rows.length - 1

  // Helper function to render the value based on the type
  const renderValue = (row: PlaygroundDataTableRowData) => {
    if (row.type === 'bigint') {
      return row.formatFunc
        ? row.formatFunc(row.value as bigint)
        : row.value.toString()
    } else if (row.type === 'string') {
      return row.value
    } else if (row.type === 'date') {
      return row.formatFunc
        ? row.formatFunc(row.value as Date)
        : row.value.toString()
    }
  }

  return (
    <table className="text-white min-w-full text-sm mt-2">
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td
              className={`px-4 bg-backgroundMoreInteractive font-semibold ${
                index === 0 ? 'rounded-tl-md pt-[5px]' : ''
              } ${index === lastIndex ? 'rounded-bl-md pb-1' : 'pb-1'}`}
            >
              {row.label}
            </td>
            <td
              className={`px-4 bg-backgroundMoreInteractive flex justify-between text-accent ${
                index === 0 ? 'rounded-tr-md pt-[5px]' : ''
              } ${index === lastIndex ? 'rounded-br-md pb-1' : 'pb-1'}`}
              title={row.title ?? row.value?.toString() ?? ''}
            >
              {address
                ? (console.log({ value: renderValue(row) }), renderValue(row))
                : 'connect wallet'}
              {row.type === 'bigint' && row.unit ? (
                <span className="text-secondary">{row.unit}</span>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
