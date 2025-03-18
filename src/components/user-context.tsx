import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  avatar: string;
}

interface UserContextType {
  users: User[];
  activeUser: User | null;
  setActiveUser: (user: User) => void;
  addUser: (user: User) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: number) => void;
}

const UserContext = createContext<UserContextType>({
  users: [],
  activeUser: null,
  setActiveUser: () => {},
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
});

const testUsers: User[] = [
  {
    id: 1,
    name: 'Yeri Mua',
    avatar: 'AVATAR_URL_HERE',
  },]

export const UserProvider = ({ children, initialUsers = testUsers }: { children: ReactNode, initialUsers?: User[] }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [activeUser, setActiveUser] = useState<User | null>(users.length > 0 ? users[0] : null);

  const handleSetActiveUser = (user: User) => {
    setActiveUser(user);
  };

  const addUser = (user: User) => {
    setUsers(prevUsers => [...prevUsers, user]);
    if (users.length === 0) {
      setActiveUser(user);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
    
    if (activeUser && activeUser.id === updatedUser.id) {
      setActiveUser(updatedUser);
    }
  };

  const deleteUser = (userId: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    
    if (activeUser && activeUser.id === userId) {
      const remainingUsers = users.filter(user => user.id !== userId);
      setActiveUser(remainingUsers.length > 0 ? remainingUsers[0] : null);
    }
  };

  const value = {
    users,
    activeUser,
    setActiveUser: handleSetActiveUser,
    addUser,
    updateUser,
    deleteUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};