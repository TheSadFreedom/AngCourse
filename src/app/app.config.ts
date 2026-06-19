import { ApplicationConfig } from '@angular/core';
import { coreConfig } from './core/core.config';

export const appConfig: ApplicationConfig = {
  providers: [
    ...coreConfig.providers
  ]
};
