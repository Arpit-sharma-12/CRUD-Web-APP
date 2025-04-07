export interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export type CreateItemDTO = Omit<Item, 'id' | 'createdAt'>;
export type UpdateItemDTO = Partial<CreateItemDTO>;

export const validateItem = (item: Partial<Item>): boolean => {
  if (!item.name || typeof item.name !== 'string' || item.name.length < 1) {
    return false;
  }
  if (!item.description || typeof item.description !== 'string') {
    return false;
  }
  return true;
};
