import { Firestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Database } from "@angular/fire/database";
import { Channel } from '../models/channel.model';
import { FirebaseService } from "../../shared/services/firebase.service";

@Injectable()
export class ChannelsService extends FirebaseService<Channel> {
    constructor(
        public afStore: Firestore,
        public afDatabase: Database
    ) {
        super('channels', afStore, afDatabase);
    }
}