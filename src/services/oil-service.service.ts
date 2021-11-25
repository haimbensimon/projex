import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Oil } from '../models/Oil'
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OilServiceService {

  oilCollection!: AngularFirestoreCollection<Oil>;
  oils$!: Observable<Oil[]>;
  osearchByName$: Subject<string> = new Subject<string>();
  odataFromSearchByName$!: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.oilCollection = this.afs.collection('oils');
    this.odataFromSearchByName$ = this.osearchByName$.pipe(
      switchMap((term) => {
        return this.oilCollection.ref.where('HeName', '==', term).get();
      })
    );
    this.oils$ = this.oilCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Oil>[]) => {
        return actions.map((o) => {
          const data = o.payload.doc.data() as Oil;
          data.id = o.payload.doc.id;
          return data;
        });
      })
    );
  }

  getOil(id: string): Observable<Oil | null> {
    const doc = this.oilCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<Oil>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as Oil;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addOil(oil: Oil) {
    return this.oilCollection
      .add(oil)
      .then((value: DocumentReference<Oil>) => {
        alert('success');
          })
      .catch((reason: any) => {
        alert('failed');
      });
  }

  updateOil(oil: Oil) {
    const doc: AngularFirestoreDocument<Oil> = this.oilCollection.doc(oil.id);

    // : AngularFirestoreDocument<Oil>
    return doc
      .update(oil)
      .then((_) => {
        alert('success');
          })
      .catch((reason: any) => {
        alert('failed:' + reason.message);
      });
  }

  deleteOil(oil: Oil) {
    const doc: AngularFirestoreDocument<Oil> = this.oilCollection.doc(oil.id);

    return doc
      .delete()
      .then((_) => {
        alert('success');
        })
      .catch((reason: any) => {
        alert('failed');
      });
  }
}
