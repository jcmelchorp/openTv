import { FirebaseService } from './firebase.service';
import { FirestoreV9Service } from './firestore-v9.service';
import { SeoService } from './seo.service';
import { SnackService } from './snack.service';
import { SubscriptionService } from './subscription.service';

export const genericServices: any[] = [
  SeoService,
  SnackService,
  SubscriptionService,
  FirestoreV9Service,
  FirebaseService
]
export * from './seo.service';
export * from './snack.service';
export * from './subscription.service';
export * from './firestore-v9.service';
export * from './firebase.service';

