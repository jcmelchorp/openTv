import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { FirebaseService } from '../generic services';
import { Firestore } from '@angular/fire/firestore';
import { Database } from '@angular/fire/database';

@Injectable()
export class CategoriesService extends FirebaseService<Category> {
  constructor(
    public afStore: Firestore,
    public afDatabase: Database
  ) {
    super('categories', afStore, afDatabase);
  }
}
