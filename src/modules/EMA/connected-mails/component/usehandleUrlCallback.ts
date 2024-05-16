import { toastOptions } from '@/configs/global-configs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useHandleUrlCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  const [successDetails, setSuccessDetails] = useState(null);

  useEffect(() => {
    if (!location.search) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has('error')) {
      const error = searchParams.get('error');
      if (error === 'access_denied') {
        toast.error(
          'Access denied. You did not grant the necessary permissions.',
          toastOptions
        );
      } else {
        toast.error(`An error occurred: ${error}`, toastOptions);
      }
      navigate(location.pathname, { replace: true });

      return;
    }

    if (searchParams.has('code')) {
      const state = searchParams.get('state');
      const code = searchParams.get('code');
      const scope = searchParams.get('scope');

      const connectionDetails = {
        state,
        code,
        scope
      };
      setSuccessDetails(connectionDetails);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return successDetails;
}

export default useHandleUrlCallback;
