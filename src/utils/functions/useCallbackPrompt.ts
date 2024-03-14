import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useBlocker } from './useBlocker';

/**
 * Custom hook that provides a callback prompt for blocking navigation. It returns a boolean value indicating whether the prompt should be shown, and functions to confirm or cancel the navigation.
 * @param when - A boolean value indicating whether the prompt should be active.
 * @returns An array containing the following elements:
 *   - showPrompt: A boolean value indicating whether the prompt should be shown.
 *   - confirmNavigation: A function to confirm the navigation and hide the prompt.
 *   - cancelNavigation: A function to cancel the navigation and hide the prompt.
 */
export function useCallbackPrompt(when: boolean): (boolean | (() => void))[] {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState<any>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  /**
   * Function to cancel the navigation and hide the prompt.
   */
  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
    setLastLocation(null);
  }, []);

  /**
   * Function to handle blocking navigation and show the prompt.
   * @param nextLocation - The next location object.
   * @returns A boolean value indicating whether the navigation should be blocked.
   */
  const handleBlockedNavigation = useCallback(
    (nextLocation: any) => {
      // Check if the next location is different from the current location
      if (
        !confirmedNavigation &&
        nextLocation.location.pathname !== location.pathname
      ) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation, location]
  );

  /**
   * Function to confirm the navigation and hide the prompt.
   */
  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location?.pathname);

      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false);
    }
  }, [confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
}
