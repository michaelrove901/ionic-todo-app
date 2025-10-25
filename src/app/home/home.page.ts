import { Component, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { FeatureFlagService } from '../services/feature-flag.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, NgIf],
})
export class HomePage implements OnInit {

  featureEnabled = signal(false);

  constructor(private featureFlagService: FeatureFlagService) {}

  async ngOnInit() {
    await this.featureFlagService.initialize();

    const isEnabled: boolean = await this.featureFlagService.isFeatureEnabled('enableNewFeature');

    this.featureEnabled.set(isEnabled);
  }
}
