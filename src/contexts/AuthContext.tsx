import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import Router, { useRouter } from "next/router";

import { useToast } from "@chakra-ui/react";

import { api } from "services/apiClient";
import { queryClient } from "services/queryClient";

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: AuthUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

type AuthUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

type SignInCredentials = {
  email: string;
  password: string;
};

export const signOut = () => {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refresh_token");

  authChannel.postMessage("signOut");

  queryClient.removeQueries();

  Router.push("/");
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const toast = useToast();
  const router = useRouter();

  const [user, setUser] = useState<AuthUser>();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          setIsLoading(false);
          Router.push("/");
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get(`/collaborators/user-by-token`)
        .then((response) => {
          const { id, email, name, isAdmin } = response.data.user;

          setUser({ id, email, name, isAdmin });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    setIsLoading(true);
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, refresh_token } = response.data;
      const { id, name, isAdmin } = response.data.user;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // (30 days)
        path: "/",
      });

      setCookie(undefined, "nextauth.refresh_token", refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // (30 days)
        path: "/",
      });

      setUser({
        id,
        email,
        isAdmin,
        name,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (err) {
      const message = err?.response?.data?.message;

      toast({
        title: `${
          message
            ? message
            : "Ops! Ocorreu um erro, tente novamente mais tarde."
        }`,
        status: "error",
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signOut,
        signIn,
        user,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
