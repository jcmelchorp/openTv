import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CollectionReference, Firestore, collection, collectionData, deleteDoc, doc, getDoc, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { IFirebase, firebaseSerialize } from '../models/firebase.model';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class FirestoreV9Service<T> implements IFirebase<T> {
    public readonly tCollection: string;
    public colRef: CollectionReference;
    constructor(
        @Inject('') public collectionName: string,
        public afs: Firestore,
    ) {
        if (!collectionName) {
            throw new Error('Firestore called with no collection name');
        } else {

        }
        this.tCollection = collectionName;
        this.colRef = collection(this.afs, this.collectionName);
    }
    add(entity: T, id?: string): Promise<T> {
        let key: string = '';
        const refColl = collection(this.afs, this.tCollection);
        id ? (key = id) : (key = '');
        if (key !== '') {
            console.log('Entity with Id: ' + key + ' added');
            const refDoc = doc(refColl, key);
            return setDoc(refDoc, firebaseSerialize({ ...entity, id: key }))
                .then(() => { return { ...entity, id: key } as T });
        } else {
            console.log('Entity with no Id');
            const refDoc = doc(refColl);
            return setDoc(refDoc, firebaseSerialize({ ...entity, id: refDoc.id }))
                .then(() => { return { ...entity, id: refDoc.id } as T });
        }
    }



    update(id: string, entity: T): Observable<T> {
        const refDoc = doc(this.afs, this.tCollection, id);
        return from(updateDoc(refDoc, firebaseSerialize(entity))).pipe(map(_ => entity));
    }
    getById(id: string): Observable<T> {
        const refDoc = doc(this.afs, this.tCollection, id);
        return from(getDoc(refDoc)).pipe(map(x => x.data() as T));
    }
    getByChannelId(channelId: string): Observable<T> {
        const refCollection = collection(this.afs, this.tCollection);
        return collectionData(refCollection, { idField: 'channel' }).pipe(map(x => x as T));
    }
    delete(id: string): Observable<string> {
        const refDoc = doc(this.afs, this.tCollection, id);
        return from(deleteDoc(refDoc)).pipe(map(_ => id));
    }
    list(): Observable<T[]> {
        const refCollection = collection(this.afs, this.tCollection);
        return collectionData(refCollection, { idField: 'id' }).pipe(take(1), map(x => x as T[]));
        /* const tCollection = collection(thisrefCollection.afs, this.collection);
        return from(collectionData(tCollection)).pipe(tap(x => console.log(x as T[])), map(x => x.map(data => data.data as T))); */
        /*     return this.fsCollection.valueChanges({ idField: 'id' });
         */
    }


    getWithQuery(queryParams: HttpParams): Observable<T[]> {
        const queryWithParams = query(collection(this.afs, this.tCollection), /*where(Object.keys(queryParams.httpParams!).pop(), '==', Object.values(queryParams.httpParams!).pop())*/)
        return collectionData(queryWithParams, { idField: 'id' }).pipe(take(1), map(x => x as T[]));

        /* return this.afs.collection<T>(this.collection, ref => ref.where(
          query['field'].toString(),
          query['operation'] as any,
          query['value'].toString()
        )).valueChanges({ idField: 'id' }) */
    }

    upsert(entity: T): Observable<any> {
        const tCollection = doc(collection(this.afs, this.tCollection));
        return from(setDoc(tCollection, { ...entity, id: tCollection.id }, { merge: true }));
        /* const itemToUpsert = entity as any;
        if (itemToUpsert.id) {
          return this.update(itemToUpsert.id, itemToUpsert);
        } else {
          return this.add(itemToUpsert);
        } */
    }


    /* getMany(field?: string, predicate?: any, value?: any) : Observable<T> {
      const tCollection = collection(this.afs, this.collection);
      return from(collectionData(tCollection, {
        idField: 'id'
      })).pipe(map(x => x as T[]));
      / return this.afs.collection<T>(this.collection, ref => ref.where(
         field,
         predicate,
         value
       )).valueChanges(); */

}