import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseService } from '../generic services';
import { Stream } from '../../core/models/stream.model';
import { Database } from '@angular/fire/database';

@Injectable()
export class StreamsService extends FirebaseService<Stream> {
  constructor(
    public afStore: Firestore,
    public afDatabase: Database
  ) {
    super('streams', afStore, afDatabase);
  }


}