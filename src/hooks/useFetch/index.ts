import { useEffect, useState } from "react";

import {
  ApiError,
  ApiStatus,
  FetchData,
  FetchMethod,
  FetchStatus,
  Headers,
  OnAfterFailed,
  OnAfterSuccess,
} from "../../types/api";
import { useDebouncedValue } from "../useDebouncedValue";
import axios from "axios";
import { useAuth } from "../../features/auth";

export type FetchOptions<Data = any> = {
  onAfterSuccess?: OnAfterSuccess<Data>;
  onAfterFailed?: OnAfterFailed;
};

export type FetchFnReset = () => void;
export type FetchFnCall<Data = unknown> = (
  args?: {
    method: FetchMethod;
    url: string;
    data?: any;
    headers?: Headers;
    responseTransform?: (res: any) => any;
  },
  options?: Omit<FetchOptions<Data>, "fetchWhenMount">
) => void;
export type UseFetchReturn<Data = unknown> = [
  FetchData<Data>,
  FetchStatus,
  FetchFnCall<Data>,
  FetchFnReset
];

export const useFetch = <Data = any>(): UseFetchReturn<Data> => {
  const [response, setResponse] = useState<FetchData<Data>>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<ApiStatus>("NOT_STARTED");
  const [wasCalled, setWasCalled] = useState<boolean>(false);

  const { authData } = useAuth();

  const debouncedStatus = useDebouncedValue<ApiStatus>(status, 100);

  useEffect(() => {
    if (debouncedStatus === "SUCCESS") {
      setStatus("NOT_STARTED");
    }
  }, [debouncedStatus]);

  const handleReset = () => {
    setResponse(null);
    setError(null);
    setStatus("NOT_STARTED");
    setWasCalled(false);
  };

  const handleFetch: FetchFnCall<Data> = async (args, options) => {
    if (!args) throw new Error("Should set some fetch args");

    const { onAfterSuccess, onAfterFailed } = options || {};

    try {
      setStatus("BUSY");
      const { method, url, data, headers = {}, responseTransform } = args;

      const axiosResponse = await axios({
        url,
        method,
        data,
        headers: {
          ...headers,
          token: authData?.token,
        },
      });

      let response = axiosResponse.data;

      if (responseTransform) {
        response = responseTransform(response);
      }

      setResponse(response);
      onAfterSuccess?.(response);
      setStatus("SUCCESS");
      setWasCalled(true);
    } catch (e) {
      onAfterFailed?.(e as ApiError);
      setResponse(null);
      setError(e as ApiError);
      setStatus("FAILED");
      setWasCalled(true);
    }
  };

  return [
    response,
    {
      isNotStarted: status === "NOT_STARTED",
      isBusy: status === "BUSY",
      isFailed: status === "FAILED",
      isSuccess: status === "SUCCESS",
      error,
      wasCalled,
    },
    handleFetch,
    handleReset,
  ];
};