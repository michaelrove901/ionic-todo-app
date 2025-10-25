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
  filteredTasks: Task[] = [];
  categories: Category[] = [];
  selectedCategoryId?: string;

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadTasks();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(allTasks => {
      this.tasks = allTasks;
      this.applyFilter();
    });
  }

  filterByCategory(categoryId?: string) {
    this.selectedCategoryId = categoryId;
    this.applyFilter();
  }

  private applyFilter() {
    this.filteredTasks = this.selectedCategoryId
      ? this.tasks.filter(t => t.categoryId === this.selectedCategoryId)
      : [...this.tasks];
  }

  getCategoryName(task: Task): string {
    return this.categories.find(c => c.id === task.categoryId)?.name || '';
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: { categories: this.categories },
    });

    modal.onDidDismiss().then(() => this.loadTasks());
    await modal.present();
  }

  async openEditModal(task: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: { task, categories: this.categories },
    });

    modal.onDidDismiss().then(() => this.loadTasks());
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

  async toggleCompleted(task: Task) {
    const updatedTask: Task = { ...task, completed: !task.completed };
    await this.taskService.updateTask(updatedTask);
    this.loadTasks();
  }
}
