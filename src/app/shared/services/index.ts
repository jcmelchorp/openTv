import { ApiService } from './api.service';
import { FirebaseService } from './firebase.service';
import { FirestoreV9Service } from './firestore-v9.service';
import { LoaderService } from './loader.service';
import { SeoService } from './seo.service';
import { SnackService } from './snack.service';
import { SnackbarService } from './snackbar.service';
import { SubscriptionService } from './subscription.service';

export const sharedServices: any[] = [
  SeoService,
  SnackService,
  SnackbarService,
  SubscriptionService,
  LoaderService,
  FirestoreV9Service,
  FirebaseService,
  ApiService
]
export * from './seo.service';
export * from './snack.service';
export * from './snackbar.service';
export * from './subscription.service';
export * from './loader.service';
export * from './firestore-v9.service';
export * from './firebase.service';
export * from './api.service'
