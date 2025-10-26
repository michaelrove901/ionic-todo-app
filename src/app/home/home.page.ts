
import { Component, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  IonHeader,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonText,
  AlertController
} from '@ionic/angular/standalone';

import { FeatureFlagService } from '../services/feature-flag.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonText,
    NgIf,
    NavbarComponent
  ],
})
export class HomePage implements OnInit {

  featureEnabled = signal(false);

  constructor(
    private featureFlagService: FeatureFlagService,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    await this.featureFlagService.initialize();
    const isEnabled: boolean = await this.featureFlagService.isFeatureEnabled('enableNewFeature');
    this.featureEnabled.set(isEnabled);
  }

  async showFeatureActivated() {
    const alert = await this.alertCtrl.create({
      header: '¡Nueva Funcionalidad!',
      message: 'La feature flag ha sido activada. Ahora puedes probar la nueva funcionalidad 🎉',
      buttons: ['Aceptar'],
      cssClass: 'feature-alert'
    });
    await alert.present();
  }
}
