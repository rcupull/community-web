import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveOneUserPost = (): {
  removeOneUserPost: FetchResource<{ id: string }, void>;
} => {
  const fetch = useFetch();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    removeOneUserPost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ id }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/user/:userId/posts/:id',
              urlParams: { id, userId },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
