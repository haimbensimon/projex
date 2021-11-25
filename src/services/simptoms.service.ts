import { Injectable } from '@angular/core';
import { Positive, Negative } from '../models/Simptom';
import { Component, OnInit } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SimptomsService {

  positiveCollection!: AngularFirestoreCollection<Positive>;
  positive$!: Observable<Positive[]>;
  searchByName$: Subject<string> = new Subject<string>();
  dataFromSearchByName$!: Observable<any>;

  negativeCollection!: AngularFirestoreCollection<Negative>;
  negative$!: Observable<Negative[]>;
  searchnegativeByName$: Subject<string> = new Subject<string>();
  dataFromSearchnegativeByName$!: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.positiveCollection = this.afs.collection('positive');
    this.dataFromSearchByName$ = this.searchByName$.pipe(
      switchMap((term) => {
        return this.positiveCollection.ref.where('goodFor', '==', term).get();
      })
    );
    this.positive$ = this.positiveCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Positive>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Positive;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    ////////   negative
    this.negativeCollection = this.afs.collection('negative');
    this.dataFromSearchnegativeByName$ = this.searchnegativeByName$.pipe(
      switchMap((term) => {
        return this.negativeCollection.ref.where('careFor', '==', term).get();
      })
    );
    this.negative$ = this.negativeCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Negative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Negative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getPositive(id: string): Observable<Positive | null> {
    const doc = this.positiveCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<Positive>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as Positive;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addPositive(pos: Positive) {
    return this.positiveCollection
      .add(pos)
      .then((value: DocumentReference<Positive>) => {
        alert('positive add successfuly');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  updatePositive(pos: Positive) {
    const doc: AngularFirestoreDocument<Positive> = this.positiveCollection.doc(
      pos.id
    );
    return doc
      .update(pos)
      .then((_) => {
        alert('positive updated successfuly');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  deletePositive(pos: Positive) {
    const doc: AngularFirestoreDocument<Positive> = this.positiveCollection.doc(
      pos.id
    );
    return doc
      .delete()
      .then((_) => {
        alert('Negative updated successfuly');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  ////// negative

  getNegative(id: string): Observable<Negative | null> {
    const doc = this.negativeCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<Negative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as Negative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addNegative(pos: Negative) {
    return this.negativeCollection
      .add(pos)
      .then((value: DocumentReference<Negative>) => {
        alert('positive add successfuly');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  updateNegative(pos: Negative) {
    const doc: AngularFirestoreDocument<Negative> = this.negativeCollection.doc(
      pos.id
    );
    return doc
      .update(pos)
      .then((_) => {
        alert('positive updated successfuly');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  deleteNegative(pos: Negative) {
    const doc: AngularFirestoreDocument<Negative> = this.negativeCollection.doc(
      pos.id
    );
    return doc
      .delete()
      .then((_) => {
        alert('Negative updated successfuly');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }
}
