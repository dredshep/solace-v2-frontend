type RowData = {
  label: string
  value: bigint | undefined
  unit?: string
  formatFunc?: (val: bigint) => string
}

type AABTProps = {
  rows: RowData[]
}

export default function AllowanceAndBalanceTable({ rows }: AABTProps) {
  const lastIndex = rows.length - 1

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
              className={`px-4 bg-backgroundMoreInteractive text-accent ${
                index === 0 ? 'rounded-tr-md pt-[5px]' : ''
              } ${index === lastIndex ? 'rounded-br-md pb-1' : 'pb-1'}`}
              title={row.value?.toString() ?? ''}
            >
              {row.value !== undefined
                ? row.formatFunc
                  ? row.formatFunc(row.value)
                  : row.value.toString()
                : 'connect wallet'}{' '}
              {row.value !== undefined && row.value > 0n && row.unit ? (
                <span className="text-secondary">{row.unit}</span>
              ) : (
                ``
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
