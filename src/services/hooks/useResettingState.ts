import { useEffect, useState } from 'react';

export function useResettingState<T>(
  valueFn: (previousState: undefined | T) => T,
  deps: unknown[]
) {
  const [state, setState] = useState<T>(valueFn as () => T);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    // don't call setState on initial mount
    if (updateCount > 0) {
      setState(valueFn);
    }
    setUpdateCount(updateCount => ++updateCount);

    // purposefully omitting `updateCount`, `setUpdateCount`, and `valueFn`
    // this means updating only the valueFn has no effect, but allows for more natural feeling hook use
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, setState] as const;
}
