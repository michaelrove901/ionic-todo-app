import { Injectable } from '@angular/core';
import { RemoteConfig, getValue, fetchAndActivate } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  constructor(private remoteConfig: RemoteConfig) {
    this.remoteConfig.settings.minimumFetchIntervalMillis = 1000;
    this.remoteConfig.defaultConfig = {
      enableNewFeature: false
    };
  }

  async initialize(): Promise<void> { 
      await fetchAndActivate(this.remoteConfig);
  }

  async isFeatureEnabled(flagKey: string): Promise<boolean> {
    try {
      const value = getValue(this.remoteConfig, flagKey);
      return value.asBoolean();
    } catch (error) {
      console.error('Error obteniendo flag:', flagKey, error);
      return false;
    }
  }
}
