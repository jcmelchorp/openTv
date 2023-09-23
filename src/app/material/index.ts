import { FlexLayoutModule } from 'ngx-flexible-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
export const uiModules: any[] = [
  MaterialModule,
  FlexLayoutModule,
  FontAwesomeModule,
];
export const commonModules: any[] = [
  CommonModule,
  RouterModule,
  TranslateModule
];
export const formsModules: any[] = [
  FormsModule,
  ReactiveFormsModule
];
export * from './material.module';
