import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useGetOneUserBusiness = (): {
  getOneUserBusiness: FetchResource<{ routeName: string }, Business>;
} => {
  const fetch = useFetch<Business>();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getOneUserBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName',
              urlParams: {
                routeName,
                userId,
              },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
