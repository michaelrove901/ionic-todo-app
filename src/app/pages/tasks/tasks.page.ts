import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TaskModalComponent],
})
export class TasksPage {
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedCategoryId?: number;

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadTasks();
  }

  loadCategories() {
    this.categories = this.categoryService.getCategories();
  }

  loadTasks() {
    const allTasks = this.taskService.getTasks();
    this.tasks = this.selectedCategoryId
      ? allTasks.filter(t => t.categoryId === this.selectedCategoryId)
      : allTasks;
  }

  filterByCategory(categoryId?: number) {
    this.selectedCategoryId = categoryId;
    this.loadTasks();
  }

  getCategoryName(task: Task): string {
    return this.categories.find(c => c.id === task.categoryId)?.name || '';
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: { categories: this.categories },
    });

    modal.onDidDismiss().then(() => {
      this.loadTasks();
    });

    await modal.present();
  }

  async openEditModal(task: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: { task, categories: this.categories },
    });

    modal.onDidDismiss().then(() => {
      this.loadTasks();
    });

    await modal.present();
  }

  async confirmDelete(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Seguro que quieres eliminar la tarea "${task.title}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.taskService.deleteTask(task.id);
            this.loadTasks();
          },
          cssClass: 'alert-danger',
        },
      ],
    });

    await alert.present();
  }
}
