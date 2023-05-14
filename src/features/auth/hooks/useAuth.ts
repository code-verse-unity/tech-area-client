import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useAuth = () => {
  const [authentified, setauthentified] = useState(false);
  const [user, setuser] = useState(null);

  // const { } = useQuery({
  //   queryKey: ['authenticate'],
  //   queryFn : () =>
  // })

  return { authentified, user };
};

export default useAuth;
