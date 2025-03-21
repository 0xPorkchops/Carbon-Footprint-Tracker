import { useState } from 'react';

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

export function useCarbonEntries() {
  const [entries, setEntries] = useState<CarbonEntry[]>([]);

  // Create
  const createEntry = (category: Category, activity: string, emission: number): CarbonEntry => {
    const newEntry: CarbonEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      category,
      activity,
      emission
    };
    
    setEntries(prevEntries => [...prevEntries, newEntry]);
    return newEntry;
  };

  // Read
  const getAllEntries = (): CarbonEntry[] => {
    return entries;
  };

  const getEntryById = (id: string): CarbonEntry | undefined => {
    return entries.find(entry => entry.id === id);
  };

  const calculateTotalEmissions = (): number => {
    return entries.reduce((sum, entry) => sum + entry.emission, 0);
  };

  // Update
  const updateEntry = (id: string, updates: Partial<Omit<CarbonEntry, 'id'>>): CarbonEntry | null => {
    let updatedEntry: CarbonEntry | null = null;
    
    setEntries(prevEntries => 
      prevEntries.map(entry => {
        if (entry.id === id) {
          updatedEntry = { ...entry, ...updates };
          return updatedEntry;
        }
        return entry;
      })
    );
    
    return updatedEntry;
  };

  // Delete
  const deleteEntry = (id: string): boolean => {
    const initialLength = entries.length;
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    return entries.length < initialLength;
  };

  return {
    createEntry,
    getAllEntries,
    getEntryById,
    updateEntry,
    deleteEntry,
    calculateTotalEmissions
  };
}