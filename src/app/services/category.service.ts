import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    { id: 1, name: 'Personal' },
    { id: 2, name: 'Trabajo' },
  ];

  getCategories(): Category[] {
    return [...this.categories];
  }

  addCategory(name: string): Category {
    const newCategory: Category = {
      id: this.categories.length + 1,
      name,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  updateCategory(updated: Category) {
    const index = this.categories.findIndex(c => c.id === updated.id);
    if (index !== -1) {
      this.categories[index] = updated;
    }
  }

  deleteCategory(categoryId: number) {
    this.categories = this.categories.filter(c => c.id !== categoryId);
  }
}
