import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, IonInput } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './task-modal.component.html',
})
export class TaskModalComponent implements OnInit {
  @Input() task?: Task;
  title: string = '';
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();

  constructor(private modalCtrl: ModalController, private taskService: TaskService) { }

  ngOnInit() {
    if (this.task) {
      this.title = this.task.title;
    }
  }

  addTask() {
    if (!this.title.trim()) {
      return;
    }

    const newTask: Task = this.taskService.addTask(this.title);
    this.taskCreated.emit(newTask);
    this.modalCtrl.dismiss();
  }

  saveTask() {
    if (!this.title.trim()) {
      return;
    }

    if (this.task) {
      this.taskService.updateTask({ ...this.task, title: this.title });
      this.taskUpdated.emit(this.task);
    } else {
      const newTask = this.taskService.addTask(this.title);
      this.taskUpdated.emit(newTask);
    }
    this.modalCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
