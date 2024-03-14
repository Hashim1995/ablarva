/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import * as React from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';

/**
 * Custom hook that allows blocking navigation in a React navigation stack.
 * @param blocker - A function that will be called when navigation is blocked. It receives a transaction object as a parameter.
 * @param when - Optional boolean value indicating whether the blocker should be active or not. Defaults to true.
 */
export function useBlocker(blocker: any, when = true): void {
  const navigator = React.useContext(UNSAFE_NavigationContext).navigator as any;

  React.useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        }
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}
