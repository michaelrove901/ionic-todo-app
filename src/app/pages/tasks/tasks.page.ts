import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { TaskService,  } from '../../services/task.service';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { AlertController } from '@ionic/angular';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class TasksPage {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent
    });

    modal.onDidDismiss().then(() => {
      this.loadTasks();
    });

    await modal.present();
  }

  async openEditModal(task: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: { task }
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
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.taskService.deleteTask(task.id);
            this.loadTasks();
          },
          cssClass: 'alert-danger'
        }
      ]
    });

    await alert.present();
  }

}
