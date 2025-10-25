import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
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
  categories: Category[] = [];      // Array local para validaciones
  categories$!: Observable<Category[]>; // Observable para la vista

  constructor(
    private categoryService: CategoryService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // Obtenemos el Observable para la vista
    this.categories$ = this.categoryService.getCategories();

    // Suscribimos para mantener el array local actualizado
    this.categories$.subscribe(categories => {
      this.categories = categories;
      console.log('Categories loaded:', this.categories);
    });
  }

  async addCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva categoría',
      inputs: [{ name: 'name', placeholder: 'Nombre de la categoría' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: async (data) => {
            const name = data.name?.trim();
            if (!name) return;

            // Validar si ya existe la categoría
            const exists = this.categories.some(
              c => c.name.toLowerCase() === name.toLowerCase()
            );
            if (exists) {
              const errorAlert = await this.alertCtrl.create({
                header: 'Error',
                message: 'La categoría ya existe.',
                buttons: ['Aceptar'],
              });
              await errorAlert.present();
              return;
            }

            // Si no existe, agregar
            await this.categoryService.addCategory({ name });
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
          handler: async (data) => {
            const name = data.name?.trim();
            if (!name) return;

            // Validar que no exista otra categoría con el mismo nombre
            const exists = this.categories.some(
              c => c.name.toLowerCase() === name.toLowerCase() && c.id !== category.id
            );
            if (exists) {
              const errorAlert = await this.alertCtrl.create({
                header: 'Error',
                message: 'Ya existe otra categoría con ese nombre.',
                buttons: ['Aceptar'],
              });
              await errorAlert.present();
              return;
            }

            await this.categoryService.updateCategory({ ...category, name });
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
          handler: async () => {
            await this.categoryService.deleteCategory(category.id);
          },
        },
      ],
    });
    await alert.present();
  }
}
