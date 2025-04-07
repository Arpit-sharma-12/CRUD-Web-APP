import { Item } from '../types/item';

// Simple in-memory store
let items: Item[] = [];

export const store = {
  getItems: () => items,
  addItem: (item: Omit<Item, 'id' | 'createdAt'>) => {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    items.push(newItem);
    return newItem;
  },
  updateItem: (id: string, updateData: Partial<Item>) => {
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    items[index] = { ...items[index], ...updateData };
    return items[index];
  },
  deleteItem: (id: string) => {
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    items = items.filter(item => item.id !== id);
    return true;
  }
};
