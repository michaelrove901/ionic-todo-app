import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
  private nextId = 1;

  constructor() {}

  getCategories(): Category[] {
    return [...this.categories];
  }

  addCategory(name: string): Category {
    const newCategory: Category = { id: this.nextId++, name };
    this.categories.push(newCategory);
    return newCategory;
  }

  updateCategory(updatedCategory: Category) {
    const index = this.categories.findIndex(c => c.id === updatedCategory.id);
    if (index !== -1) {
      this.categories[index] = updatedCategory;
    }
  }

  deleteCategory(categoryId: number) {
    this.categories = this.categories.filter(c => c.id !== categoryId);
  }
}
