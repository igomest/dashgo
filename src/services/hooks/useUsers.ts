import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
};

type GetUsersResponse = {
  users: User[];
};

export async function getUsers(): Promise<GetUsersResponse> {
  // Separei a função que faz o fetch de users do hook useUsers,
  // porque essa função de fazer o fetch, não depende do React Query.
  // Ou seja, se eu precisar utilizar a função em outro lugar sem o React Query, eu poderia reutilizá-la sem problemas.
  const { data } = await api.get("users");

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
    };
  });

  return {
    users,
  };
}

export function useUsers() {
  return useQuery(["users"], () => getUsers(), {
    staleTime: 1000 * 60 * 10,  // 10 minutes
  });
}
