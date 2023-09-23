import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SidenavComponent } from './sidenav/sidenav.component';
export const layoutComponents: any[] = [
  HeaderComponent,
  SidenavComponent,
  LayoutComponent,
  MainContentComponent
]
export * from './layout.component';
export * from './header/header.component';
export * from './sidenav/sidenav.component';
export * from './main-content/main-content.component';

