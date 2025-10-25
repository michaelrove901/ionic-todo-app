import { Category } from './category.model';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  categoryId?: number;
}