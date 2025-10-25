import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Comprar leche', completed: false, categoryId: 1 },
    { id: 2, title: 'Estudiar Ionic', completed: true, categoryId: 2 },
  ];

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(title: string, categoryId?: number): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      completed: false,
      categoryId,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }
}
