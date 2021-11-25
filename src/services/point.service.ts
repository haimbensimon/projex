
import { Point } from '../models/Point';
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
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  pointCollection!: AngularFirestoreCollection<Point>;
  points$!: Observable<Point[]>;
  pointsearchByName$: Subject<string> = new Subject<string>();
  pointdataFromSearchByName$!: Observable<any>;

  constructor(private afs: AngularFirestore, public dialog: MatDialog) {
    this.pointCollection = this.afs.collection('points');
    this.pointdataFromSearchByName$ = this.pointsearchByName$.pipe(
      switchMap((term) => {
        return this.pointCollection.ref.where('point', '==', term).get();
      })
    );
    this.points$ = this.pointCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Point>[]) => {
        return actions.map((o) => {
          const data = o.payload.doc.data() as Point;
          data.id = o.payload.doc.id;
          return data;
        });
      })
    );
  }

  getpoint(id: string): Observable<Point | null> {
    const doc = this.pointCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<Point>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as Point;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addpoint(point: Point) {
    return this.pointCollection
      .add(point)
      .then((value: DocumentReference<Point>) => {
        alert('success');
      })
      .catch((reason: any) => {
        alert('failed');
      });
  }

  updatepoint(point: Point) {
    const doc: AngularFirestoreDocument<Point> = this.pointCollection.doc(
      point.id
    );

    // : AngularFirestoreDocument<Oil>
    return doc
      .update(point)
      .then((_) => {
        alert('success')
      })
      .catch((reason: any) => {
        alert('failed:' + reason.message);
      });
  }

  deletepoint(point: Point) {
    const doc: AngularFirestoreDocument<Point> = this.pointCollection.doc(
      point.id
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
