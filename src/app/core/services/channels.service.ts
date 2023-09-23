import { FirebaseService } from '../generic services';
import { Channel } from "../../core/models/channel.model";
import { Firestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Database } from "@angular/fire/database";

@Injectable()
export class ChannelsService extends FirebaseService<Channel> {
    constructor(
        public afStore: Firestore,
        public afDatabase: Database
    ) {
        super('channels', afStore, afDatabase);
    }
}