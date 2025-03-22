import { createContext, useContext, useState, ReactNode } from 'react';

export enum Category {
  Food = 'Food',
  Transportation = 'Transportation',
  Energy = 'Energy',
  Waste = 'Waste',
  Water = 'Water',
  Other = 'Other'
}

export interface CarbonEntry {
  id: string;
  date: string;
  category: Category;
  activity: string;
  emission: number;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  carbonEntries: CarbonEntry[];
}

interface UserContextType {
  users: User[];
  activeUser: User | null;
  setActiveUser: (user: User) => void;
  addUser: (user: User) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: number) => void;

  createEntry: (category: Category, activity: string, emission: number) => CarbonEntry | null;
  getAllEntries: () => CarbonEntry[];
  getEntryById: (id: string) => CarbonEntry | undefined;
  updateEntry: (id: string, updates: Partial<Omit<CarbonEntry, 'id'>>) => CarbonEntry | null;
  deleteEntry: (id: string) => boolean;
  calculateTotalEmissions: () => number;
}

const UserContext = createContext<UserContextType>({
  users: [],
  activeUser: null,
  setActiveUser: () => {},
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},

  createEntry: () => null,
  getAllEntries: () => [],
  getEntryById: () => undefined,
  updateEntry: () => null,
  deleteEntry: () => false,
  calculateTotalEmissions: () => 0
});

export const UserProvider = ({ children, initialUsers = [] }: { children: ReactNode, initialUsers?: User[] }) => {
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

  const createEntry = (category: Category, activity: string, emission: number): CarbonEntry | null => {
    if (!activeUser) return null;

    const newEntry: CarbonEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      category,
      activity,
      emission
    };
    
    const updatedUser = {
      ...activeUser,
      carbonEntries: [...activeUser.carbonEntries, newEntry]
    };
    
    updateUser(updatedUser);
    return newEntry;
  };

  const getAllEntries = (): CarbonEntry[] => {
    if (!activeUser) return [];
    return activeUser.carbonEntries;
  };

  const getEntryById = (id: string): CarbonEntry | undefined => {
    if (!activeUser) return undefined;
    return activeUser.carbonEntries.find(entry => entry.id === id);
  };

  const updateEntry = (id: string, updates: Partial<Omit<CarbonEntry, 'id'>>): CarbonEntry | null => {
    if (!activeUser) return null;
    
    let updatedEntry: CarbonEntry | null = null;
    const updatedEntries = activeUser.carbonEntries.map(entry => {
      if (entry.id === id) {
        updatedEntry = { ...entry, ...updates };
        return updatedEntry;
      }
      return entry;
    });
    
    updateUser({
      ...activeUser,
      carbonEntries: updatedEntries
    });
    
    return updatedEntry;
  };

  const deleteEntry = (id: string): boolean => {
    if (!activeUser) return false;
    
    const initialLength = activeUser.carbonEntries.length;
    const newEntries = activeUser.carbonEntries.filter(entry => entry.id !== id);
    
    updateUser({
      ...activeUser,
      carbonEntries: newEntries
    });
    
    return newEntries.length < initialLength;
  };

  const calculateTotalEmissions = (): number => {
    if (!activeUser) return 0;
    return activeUser.carbonEntries.reduce((sum, entry) => sum + entry.emission, 0);
  };

  const value = {
    users,
    activeUser,
    setActiveUser: handleSetActiveUser,
    addUser,
    updateUser,
    deleteUser,

    createEntry,
    getAllEntries,
    getEntryById,
    updateEntry,
    deleteEntry,
    calculateTotalEmissions
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