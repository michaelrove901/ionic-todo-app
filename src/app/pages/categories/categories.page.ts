import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, NavbarComponent],
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss']
})
export class CategoriesPage {
  categories: Category[] = [];
  selectedCategoryId?: string;

  animateBadge: { [categoryId: string]: WritableSignal<boolean> } = {};

  constructor(
    private categoryService: CategoryService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
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

            const exists = this.categories.some(c => c.name.toLowerCase() === name.toLowerCase());
            if (exists) {
              this.showToast('La categoría ya existe', 'danger');
              return;
            }

            await this.categoryService.addCategory({ name });
            this.loadCategories();
            this.showToast('¡Categoría creada con éxito!', 'success');
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

            const exists = this.categories.some(
              c => c.name.toLowerCase() === name.toLowerCase() && c.id !== category.id
            );
            if (exists) {
              this.showToast('Ya existe otra categoría con ese nombre', 'danger');
              return;
            }

            await this.categoryService.updateCategory({ ...category, name });
            this.loadCategories();
            this.showToast('¡Categoría actualizada con éxito!', 'success');
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
            this.loadCategories();
            this.showToast('¡Categoría eliminada con éxito!', 'success');
          },
          cssClass: 'alert-danger'
        },
      ],
    });
    await alert.present();
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
