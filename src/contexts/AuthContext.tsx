import {useToast} from "@chakra-ui/react";
import Router from "next/router";
import {destroyCookie, parseCookies, setCookie} from "nookies";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import {api} from "../services/apiClient"

type User = {
    email: string;
    permissions: string[];
    roles: string[];
};

type SignInCredentials = {
    email: string;
    password: string;
};

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
    user: User;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
    destroyCookie(undefined, "nextauth.token");
    destroyCookie(undefined, "nextauth.refreshToken");

    authChannel.postMessage('signOut')

    Router.push("/");
}

export function AuthProvider({children}: AuthProviderProps) {
    const toast = useToast();

    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        authChannel = new BroadcastChannel('auth')

        authChannel.onmessage = (message) => {
            switch (message.data) {
                case 'signOut':
                    signOut();
                    authChannel.close();
                    break;
                case 'signIn':
                    Router.push('/dashboard');
                    break;
                default:
                    break;
            }
        }
    }, [])


    useEffect(() => {
        const {"nextauth.token": token} = parseCookies();

        if (token) {
            api
                .get("/me")
                .then((response) => {
                    const {email, permissions, roles} = response.data;

                    setUser({email, permissions, roles});
                })
                .catch(() => {
                    signOut();
                });
        }
    }, []);

    const signIn = async ({email, password}: SignInCredentials) => {
        try {
            const response = await api.post("/sessions", {
                email,
                password,
            });

            const {token, refreshToken, permissions, roles} = response.data;

            setCookie(undefined, "nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days // quanto tempo o cookie deve ser mantido no navegador
                path: "/", // qualquer path da app vai ter acesso ao cookie
            });
            setCookie(undefined, "nextauth.refreshToken", refreshToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });

            setUser({
                email,
                permissions,
                roles,
            });

            api.defaults.headers["Authorization"] = `Bearer ${token}`;

            Router.push("/dashboard");
        } catch (err) {
            toast({
                position: "top",
                title: err.response.data.message,
                description: "Verifique seu e-mail ou senha",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <AuthContext.Provider value={{signIn, signOut, isAuthenticated, user}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
