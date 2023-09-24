import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Database } from '@angular/fire/database';
import { Country } from '../models/country.model';
import { FirebaseService } from '../../shared/services/firebase.service';

@Injectable()
export class CountriesService extends FirebaseService<Country> {
  constructor(
    public afStore: Firestore,
    public afDatabase: Database
  ) {
    super('countries', afStore, afDatabase);
  }
}