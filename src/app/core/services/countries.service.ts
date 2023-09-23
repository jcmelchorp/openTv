import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Country } from '../../core/models/country.model';
import { FirebaseService } from '../generic services';
import { Database } from '@angular/fire/database';

@Injectable()
export class CountriesService extends FirebaseService<Country> {
  constructor(
    public afStore: Firestore,
    public afDatabase: Database
  ) {
    super('countries', afStore, afDatabase);
  }
}