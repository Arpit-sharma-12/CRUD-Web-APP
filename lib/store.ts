export interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

// In-memory store
export const items: Item[] = [];

// Helper to find item by ID
export const findItem = (id: string) => items.find(item => item.id === id);
