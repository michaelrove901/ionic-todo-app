import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
private firestore = inject(Firestore);

  constructor() { }

  getCategories(): Observable<Category[]> {

    const categoriesRef = collection(this.firestore, 'categories');
    return collectionData(categoriesRef, { idField: 'id' }) as Observable<Category[]>;
  }

  async addCategory(category: Partial<Category>) {
    const categoriesRef = collection(this.firestore, 'categories');
    await addDoc(categoriesRef, category);
  }

  async updateCategory(category: Category) {
    const { id, ...categoryData } = category;
    const categoryDoc = doc(this.firestore, `categories/${id}`);
    await updateDoc(categoryDoc, categoryData);
  }
  async deleteCategory(categoryId: string) {
    const categoryDoc = doc(this.firestore, `categories/${categoryId}`);
    await deleteDoc(categoryDoc);
  }

}
