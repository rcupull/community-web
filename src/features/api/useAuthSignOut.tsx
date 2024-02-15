import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthSignOut = (): {
  authSignOut: FetchResource;
} => {
  const { authData, authSignIn } = useAuthSignIn();

  const fetch = useFetch();

  return {
    authSignOut: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options) => {
        const { token } = authData || {};

        if (!token) {
          console.log('has no token');
          return;
        }

        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-out' }),
            data: { token },
          },
          {
            ...options,
            onAfterSuccess: (response) => {
              authSignIn.reset();
              options?.onAfterSuccess?.(response);
            },
          },
        );
      },
      reset: fetch[3],
    },
  };
};
