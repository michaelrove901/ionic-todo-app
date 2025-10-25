import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, IonInput } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './task-modal.component.html',
})

export class TaskModalComponent implements OnInit {
  @Input() task?: Task;
  @Input() categories: Category[] = [];

  taskTitle: string = '';
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();
  selectedCategoryId?: number;
  constructor(private modalCtrl: ModalController, private taskService: TaskService) { }

  ngOnInit() {
    if (this.task) {
      this.taskTitle = this.task.title;
      this.selectedCategoryId = this.task.categoryId;
    }
  }

  addTask() {
    if (!this.taskTitle.trim()) return;

    const newTask = this.taskService.addTask(this.taskTitle, this.selectedCategoryId);
    this.taskCreated.emit(newTask);
    this.modalCtrl.dismiss();
  }

  saveTask() {
    if (!this.taskTitle.trim()) return;

    if (this.task) {
      this.taskService.updateTask({ ...this.task, title: this.taskTitle, categoryId: this.selectedCategoryId });
      this.taskUpdated.emit({ ...this.task, title: this.taskTitle, categoryId: this.selectedCategoryId });
    } else {
      const newTask = this.taskService.addTask(this.taskTitle, this.selectedCategoryId);
      this.taskUpdated.emit(newTask);
    }

    this.modalCtrl.dismiss();
  }
  close() {
    this.modalCtrl.dismiss();
  }
}
