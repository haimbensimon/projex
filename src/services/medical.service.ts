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
import { Customer } from '../models/Customer';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Medic } from '../models/Medic';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class MedicalService {
  medicalCollection: AngularFirestoreCollection<Medic>;
  medicals$: Observable<Medic[]>;

  constructor(private afs: AngularFirestore, public dialog: MatDialog) {
    this.medicalCollection = this.afs.collection('medicals');

    this.medicals$ = this.medicalCollection.snapshotChanges().pipe(
      // mapping the data from the observable to a new observable
      map((actions: DocumentChangeAction<Medic>[]) => {
        return actions.map((a) => {
          // extract the data from the reference
          const data = a.payload.doc.data() as Medic;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getMedic(id: string): Observable<Medic | null> {
    const doc = this.medicalCollection.doc(id);
    // const doc = this.afs.doc(`customers/${id}`);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<Medic>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as Medic;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addMedic(md: Medic) {
    return this.medicalCollection
      .add(md)
      .then((value: DocumentReference<Medic>) => {
       alert('success')
      })
      .catch((reason: any) => {
        alert('failed');
      });
  }

  updateMedic(md: Medic) {
    const doc: AngularFirestoreDocument<Medic> = this.medicalCollection.doc(
      md.id
    );

    return doc
      .update(md)
      .then((_) => {
        alert('sucess')
      })
      .catch((reason: any) => {
        alert('failed');
      });
  }

  deleteMedic(md: Medic) {
    const doc: AngularFirestoreDocument<Medic> = this.medicalCollection.doc(
      md.id
    );

    return doc
      .delete()
      .then((_) => {
        alert('success')
      })
      .catch((reason: any) => {
        alert('failed');
      });
  }
}
