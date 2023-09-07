import classNames from 'classnames'
export default function CallToActionSection() {
  return (
    <div
      className={classNames(
        // colors
        'text-white',
        // sizes
        'w-full md:max-w-4xl xl:max-w-sm 2xl:w-auto 2xl:max-w-none',
        // flex
        'flex flex-col items-center sm:items-start lg:flex-row lg:items-end xl:items-start xl:flex-col xl:min-w-max gap-10'
      )}
    >
      <div className="">
        <h1 className="text-2xl font-medium text-accent mb-6 leading-[43.20px] text-center sm:text-start">
          veSGT
        </h1>
        <div className="text-4xl font-bold leading-10 mb-9 text-center sm:text-start">
          Extra earnings <br />& voting power
        </div>
        <ul className="text-medium font-medium leading-7 flex flex-col items-center sm:items-start">
          <li>{'\u2013'} Boost liquidity mining yield up to 2.5x</li>
          <li>{'\u2013'} Vote to direct liquidity mining emissions</li>
          <li>{'\u2013'} Earn your share of protocol revenue</li>
        </ul>
      </div>
      {/* interactive button Get veSGT */}
      <div className="h-12 gap-6 inline-flex">
        <div className="px-4 py-3 bg-accent rounded items-center gap-1 flex">
          <div className="text-center text-contrastWithAccent text-lg font-semibold whitespace-nowrap">
            Get veSGT
          </div>
        </div>
        <div className="px-4 py-3 rounded border border-neutral-50 border-opacity-70 items-center gap-1 flex">
          <div className="text-center text-neutral-50 text-lg font-semibold whitespace-nowrap">
            Learn more
          </div>
        </div>
      </div>
    </div>
  )
}
