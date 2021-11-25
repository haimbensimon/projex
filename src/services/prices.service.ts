import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, Role ,Price } from '../models/User';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class PricesService {
  priceCollection!:AngularFirestoreCollection<Price>;
  prices$!:Observable<Price[]>;

  constructor(private afs:AngularFirestore) {
    this.priceCollection = this.afs.collection('prices');

    this.prices$ = this.priceCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Price>[]) => {
        return actions.map( a => {
          const data = a.payload.doc.data() as Price;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    )
  }

  addPrice(p : Price){
    this.priceCollection.add(p)
    .then((value: DocumentReference<Price>) => {
      alert('price created');
    })
    .catch((reason: any) => {
      alert('price Error')
    })
  }
updatePrice(p:Price){
  const doc:AngularFirestoreDocument<Price> = this.priceCollection.doc(p.id)
  return doc.update(p)
  .then((_) => {
    alert('price updated');
  })
  .catch((reason:any) => {
    alert('Error updating Price')
  })
}

deltePrice(p:Price){
  const doc:AngularFirestoreDocument<Price> = this.priceCollection.doc(p.id)
  return doc.delete()
  .then((_) => {
    alert('price deleted');
  })
  .catch((reason:any) => {
    alert('Error updating Price')
  })
}

}
