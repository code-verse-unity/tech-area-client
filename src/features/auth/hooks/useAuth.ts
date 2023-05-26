import { useGetWhoAmIQuery } from "@/services/serverApi";

const useAuth = () => {
  const { data, isLoading, isError, error } = useGetWhoAmIQuery();

  return {
    authenticated: data !== undefined && !isLoading,
    user: data,
    isLoading,
    isError,
    error,
  };
};

export default useAuth;
