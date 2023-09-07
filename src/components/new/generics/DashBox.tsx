import classNames from 'classnames'
export default function DashBox(props: {
  title: string
  mainValue: string
  subValue?: string
  onClick?: () => void
  verticalPadding?: 'Bigger' | 'Smaller'
  grayTone?: 'Light' | 'Dark'
}) {
  const { title, mainValue, subValue, onClick, verticalPadding, grayTone } =
    props

  return (
    <div
      className={classNames(
        'flex justify-between items-center gap-2 group rounded px-4',
        {
          'cursor-pointer px-4': onClick,
          'py-6': verticalPadding === 'Bigger',
          'py-2': verticalPadding === 'Smaller',
          'py-4': !verticalPadding,
          'bg-backgroundInteractive': grayTone === 'Light',
          'bg-backgroundSurface':
            grayTone === undefined ? true : grayTone === 'Dark',
        }
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-start gap-3">
        <div className="text-xs text-white leading-none font-medium">
          {title}
        </div>
        <div className="text-lg font-bold text-white leading-[25.20px]">
          {mainValue}
        </div>
        {subValue && (
          <div className="text-xs text-textTertiary leading-none font-medium">
            {subValue}
          </div>
        )}
      </div>
      {onClick && (
        <div className="text-4xl font-bold text-textTertiary group-hover:text-textPrimary">
          +
        </div>
      )}
    </div>
  )
}
