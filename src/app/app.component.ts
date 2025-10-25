import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FeatureFlagService } from './services/feature-flag.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private featureFlagService: FeatureFlagService) { }

  async ngOnInit() {
    await this.featureFlagService.initialize();
  }
}
