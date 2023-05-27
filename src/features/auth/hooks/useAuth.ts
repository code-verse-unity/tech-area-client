import { useAppDispatch } from "@/hooks/redux";
import { setAuthLoading } from "@/redux/reducers/authSlice";
import { useGetWhoAmIQuery } from "@/services/serverApi";

const useAuth = () => {
  const { data, isLoading, isError, error } = useGetWhoAmIQuery();

  const dispatch = useAppDispatch();
  dispatch(setAuthLoading(isLoading));

  return {
    authenticated: data !== undefined && !isLoading,
    user: data,
    isLoading,
    isError,
    error,
  };
};

export default useAuth;
