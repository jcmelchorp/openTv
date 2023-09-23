import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { child, Database, query as query_db, onValue, push, ref, set, update, get, objectVal, orderByChild, equalTo, endAt, startAt, listVal } from '@angular/fire/database';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { firebaseSerialize, IFirebase } from '../models/firebase.model';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class FirebaseService<T> implements IFirebase<T> {
  public readonly tCollection: string;
  public readonly colects!: Observable<T[]>;
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public collectionName: string,
    public readonly afs: Firestore,
    public readonly rtdb: Database,
  ) {
    this.tCollection = collectionName;
    if (!this.tCollection) {
      throw new Error('Firestore called with no collection name');
    }
    const asf_col = collection(this.afs, this.tCollection).withConverter({
      fromFirestore: snapshot => {
        const { ...T } = snapshot.data();
        const { id } = snapshot;
        const { hasPendingWrites } = snapshot.metadata;
        return { id, ...T, hasPendingWrites };
      },
      // TODO unused can we make implicit?
      toFirestore: (it: any) => it,
    });
    const queryCol = query(asf_col);
    // this.colects = collectionData(queryCol);
  }
  add(entity: T, id?: string): Promise<T> {
    // const updates = {};
    const refColl = collection(this.afs, this.tCollection);
    // const refDoc = doc(refColl);
    let key = id ? id : push(child(ref(this.rtdb), this.tCollection)).key;
    // console.log(key)
    return update(ref(this.rtdb, `/${this.tCollection}/${key}`), firebaseSerialize({ ...entity, id: key })).then(x => firebaseSerialize({ ...entity, id: key }));
    // return setDoc(refDoc, firebaseSerialize({ ...entity, id: key }))
  }

  addMany(entities: T[]): void {
    entities.forEach(entity => {
      let key = push(child(ref(this.rtdb), this.tCollection)).key;
      update(ref(this.rtdb, `/${this.tCollection}/${key}`), firebaseSerialize({ ...entity, id: key }));
    });
  }

  update(id: string, entity: Partial<T>): Observable<T> {
    const updates = {};
    update(ref(this.rtdb, `/${this.tCollection}/${id}`), firebaseSerialize({ ...entity }));
    const refDoc = doc(this.afs, this.tCollection, id);
    return from(updateDoc(refDoc, firebaseSerialize(entity))).pipe(map(x => firebaseSerialize(entity)));
  }
  getById(id: string): Observable<T> {
    let entity: T = null as any;
    onValue(ref(this.rtdb, `/${this.tCollection}/${id}`), (snapshot) => {
      entity = snapshot.val();
    }, {
      onlyOnce: true
    });
    return of(entity)
  }
  delete(id: string): Observable<string> {
    const refCollection = doc(this.afs, `${this.tCollection}/${id}`);
    return from(deleteDoc(refCollection)).pipe(take(1), map(_ => id));
  }
  list(): Observable<T[]> {
    const dbref = ref(this.rtdb, this.tCollection);
    return listVal<T>(dbref, { keyField: 'id' }).pipe(take(1), map(x => x)); //listResult))));
  }

  getWithQuery(queryParams: HttpParams): Observable<T[]> {
    console.log(Object.keys(queryParams).pop())
    const direr = ref(this.rtdb, this.tCollection)
    const queryRef = query_db(direr, equalTo(Object.values(queryParams).pop().toString()));
    return listVal<T>(direr).pipe(take(1), map(listResult => listResult));
  }
}