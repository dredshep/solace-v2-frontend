import React from 'react'
import useDebounce from '@rooks/use-debounce'

type ReloadFn = () => void

export type ReloadHook = [ReloadFn, number]

export function useReload(): ReloadHook {
  const [version, setVersion] = React.useState<number>(0)
  const reload = useDebounce(() => {
    setVersion((prevState) => prevState + 1)
  }, 400)

  return React.useMemo(() => [reload as ReloadFn, version], [version, reload])
}
