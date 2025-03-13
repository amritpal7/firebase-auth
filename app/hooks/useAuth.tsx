import { useAuthContext } from "@/app/context/AuthProvider";

const useAuth = () => {
  const { user, loading } = useAuthContext();

  return { user, loading };
};

export default useAuth;
