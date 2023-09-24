import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Firestore } from '@angular/fire/firestore';
import { Database } from '@angular/fire/database';
import { FirebaseService } from '../../shared/services/firebase.service';

@Injectable()
export class CategoriesService extends FirebaseService<Category> {
  constructor(
    public afStore: Firestore,
    public afDatabase: Database
  ) {
    super('categories', afStore, afDatabase);
  }
}
