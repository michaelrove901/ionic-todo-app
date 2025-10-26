import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, NavbarComponent],
})
export class TasksPage {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];
  selectedCategoryId?: string;

  animateBadge: { [taskId: string]: WritableSignal<boolean> } = {};

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private categoryService: CategoryService
  ) {}

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
          handler: async () => {
            await this.taskService.deleteTask(task.id);
            this.loadTasks();
            await this.showToast('¡Tarea eliminada con éxito!', 'success');
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

    if (!this.animateBadge[task.id]) {
      this.animateBadge[task.id] = signal(true);
    } else {
      this.animateBadge[task.id].set(true);
    }
    setTimeout(() => {
      this.animateBadge[task.id].set(false);
    }, 500);

    this.loadTasks();
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
    await toast.present();
  }
}
