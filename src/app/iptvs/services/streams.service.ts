import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Database } from '@angular/fire/database';
import { Stream } from '../models/stream.model';

@Injectable()
export class StreamsService extends FirebaseService<Stream> {
  constructor(
    public afStore: Firestore,
    public afDatabase: Database
  ) {
    super('streams', afStore, afDatabase);
  }


}