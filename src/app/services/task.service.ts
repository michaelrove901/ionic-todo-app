import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksCollection = collection(this.firestore, 'tasks');

  constructor(private firestore: Firestore) { }

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  async addTask(title: string, categoryId?: string): Promise<Task> {
    const newTask: Omit<Task, 'id'> = { title, completed: false, categoryId };
    const docRef = await addDoc(this.tasksCollection, newTask);
    return { id: docRef.id, ...newTask };
  }


  async updateTask(task: Task): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    await updateDoc(taskDoc, { title: task.title, completed: task.completed, categoryId: task.categoryId });
  }

  async deleteTask(taskId: string): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${taskId}`);
    await deleteDoc(taskDoc);
  }
}
