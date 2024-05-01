import { FlexLayoutModule } from 'ngx-flexible-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonsConfig, IShareButtons } from 'ngx-sharebuttons';
const customConfig: ShareButtonsConfig = {
  include: [],
  exclude: [],
  theme: 'circles-dark',
  gaTracking: true,
  autoSetMeta: true,
  twitterAccount: 'pete_sahatt'
}
export const uiModules: any[] = [
  MaterialModule,
  FlexLayoutModule,
  FontAwesomeModule,
  ShareButtonsModule.withConfig(customConfig),
  ShareIconsModule
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
