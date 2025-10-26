import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController, IonInput } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {
  @Input() task?: Task;
  @Input() categories: Category[] = [];

  taskTitle: string = '';
  selectedCategoryId?: string;

  constructor(
    private modalCtrl: ModalController,
    private taskService: TaskService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    if (this.task) {
      this.taskTitle = this.task.title;
      this.selectedCategoryId = this.task.categoryId;
    }
  }

  getCategoryName(categoryId: string) {
    return this.categories.find(c => c.id === categoryId)?.name || '';
  }

  async saveTask() {
    if (!this.taskTitle.trim()) {
      this.showToast('El título no puede estar vacío', 'danger');
      return;
    }

    if (this.task) {
      await this.taskService.updateTask({ ...this.task, title: this.taskTitle, categoryId: this.selectedCategoryId });
      this.showToast('¡Tarea actualizada con éxito!', 'success');
    } else {
      const newTask = await this.taskService.addTask(this.taskTitle, this.selectedCategoryId);
      this.showToast('¡Tarea creada con éxito!', 'success');
    }

    this.modalCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 1500,
      position: 'top',
      icon: color === 'success' ? 'checkmark-circle' : 'alert-circle',
      animated: true,
      cssClass: 'fancy-toast'
    });
    toast.present();
  }
}
