import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useUsers } from '../services/hooks/useUsers';

export interface User {
  responsible: string;
  id: string;
  name?: string;
  email?: string;
  createdAt?: string;
}

export interface UsersDataProps {
  children: ReactNode;
}

export interface UsersDataContextData {
  page: number;
  users: any[];
  ids: string[];
  isChecked: boolean;
  setIds: (prevState: string[]) => void;
  setIsChecked: (prevState: boolean) => void;
  filteredUsers: User[];
}

const UsersDataContext = createContext<UsersDataContextData>(
  {} as UsersDataContextData
);

export function UsersDataProvider({ children }: UsersDataProps) {
  const [page] = useState(1);
  const { data } = useUsers(page);
  const [users, setUsers] = useState([]);
  const [ids, setIds] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (data) {
      console.log(data.users)
      setUsers(data.users);
    }
  }, [data]);

  const filteredUsers = users?.filter((user) => ids.includes(user.id));


  return (
    <UsersDataContext.Provider
      value={{
        users,
        ids,
        setIds,
        isChecked,
        setIsChecked,
        page,
        filteredUsers
      }}
    >
      {children}
    </UsersDataContext.Provider>
  );
}

export const useUsersData = () => useContext(UsersDataContext);
