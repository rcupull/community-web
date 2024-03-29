import { useApiSlice } from 'features/slices/useApiSlice';

import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useGetAllUserBusinessRouteNames = (): {
  getAllUserBusinessRouteNames: FetchResource<undefined, Array<string>>;
  isUserOwnerOfRoute: (routeName: string) => boolean;
} => {
  const fetcBase = useFetch<Array<string>>();
  const fetch = useApiSlice(fetcBase, 'useGetAllUserBusinessRouteNames');

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    isUserOwnerOfRoute: (routeName: string) => {
      return fetch[0]?.includes(routeName) || false;
    },
    getAllUserBusinessRouteNames: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/business/allRouteNames',
              urlParams: { userId },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
