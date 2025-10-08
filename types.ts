
export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface ExpenseItem {
  id: string;
  paid: boolean;
  type: string;
  categoryId: string | null;
  budget: number;
  actual: number;
}
