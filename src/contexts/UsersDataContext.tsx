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
  const { data } = useUsers();
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
        filteredUsers
      }}
    >
      {children}
    </UsersDataContext.Provider>
  );
}

export const useUsersData = () => useContext(UsersDataContext);
