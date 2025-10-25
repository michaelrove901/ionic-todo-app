import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './categories.page.html',
})
export class CategoriesPage implements OnInit {
  // Observable directamente usado en el template con async
  categories$!: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Asignamos el observable directamente
    this.categories$ = this.categoryService.getCategories();
  }

  async addCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva categoría',
      inputs: [{ name: 'name', placeholder: 'Nombre de la categoría' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            if (data.name.trim()) {
              this.categoryService.addCategory({ name: data.name });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async editCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar categoría',
      inputs: [{ name: 'name', value: category.name }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.name.trim()) {
              this.categoryService.updateCategory({
                ...category,
                name: data.name,
              });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Eliminar la categoría "${category.name}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.categoryService.deleteCategory(category.id);
          },
        },
      ],
    });
    await alert.present();
  }
}
