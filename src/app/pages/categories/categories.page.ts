import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ModalController, AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './categories.page.html',
})

export class CategoriesPage implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.categoryService.getCategories();
  }

  async addCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva categoría',
      inputs: [{ name: 'name', placeholder: 'Nombre de la categoría' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Agregar', handler: (data) => {
            if (data.name.trim()) {
              this.categoryService.addCategory(data.name);
              this.loadCategories();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar categoría',
      inputs: [{ name: 'name', value: category.name }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Guardar', handler: (data) => {
            if (data.name.trim()) {
              this.categoryService.updateCategory({ ...category, name: data.name });
              this.loadCategories();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Eliminar la categoría "${category.name}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', handler: () => {
            this.categoryService.deleteCategory(category.id);
            this.loadCategories();
          }
        }
      ]
    });
    await alert.present();
  }
}
