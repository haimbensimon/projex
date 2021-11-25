
import { Observable, Subject } from 'rxjs';
import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators'
import { Action,AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument,DocumentChangeAction,DocumentReference,DocumentSnapshot} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers: Customer[] = [
    {
      id:"1",
      medical: [],
      firstName: 'דן',
      lastName: 'בן שימול',
      email: 'dan@gmail.com',
      phone: '052-7849332',
      notes: 'string',
      city: 'jerusalem',
      street: 'zafririm',
      curUser: 'haim',
      age:37,
    },
    {
      id:"2",
      medical: [],
      firstName: 'אבי',
      lastName: 'כהן',
      email: 'avi@gmail.com',
      phone: '052-4569382',
      notes: 'string',
      city: 'jerusalem',
      street: 'jaffo',
      curUser: 'haim',
      age:34,
    },
    {
      id:"3",
      medical: [],
      firstName: 'מורן',
      lastName: 'סינואני',
      email: 'moran@gmail.com',
      phone: '053-8834321',
      notes: 'string',
      city: 'kfar neter',
      street: 'tree',
      curUser: 'haim',
      age:45,
    },
  ];

  customerCollection!:AngularFirestoreCollection<Customer>;
  users$! : Observable<Customer[]>;

  searchByName$: Subject<string> = new Subject<string>();
  dataFromSearchByName$!: Observable<any>;

  constructor(private afs:AngularFirestore) {
    this.customerCollection = this.afs.collection("customers");

    // this.dataFromSearchByName$ = this.searchByName$.pipe(
    //   switchMap((term) => {
    //     return this.customerCollection.ref.where('name', '==', term).get();
    //   })
    // );


      this.users$ = this.customerCollection.snapshotChanges().pipe(
        map((actions:DocumentChangeAction<Customer>[]) => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Customer;
            data.id = action.payload.doc.id;
            return data;
          })
        })
      )
   }
   getCustomer(id: string): Observable<Customer | null> {
    const doc = this.customerCollection.doc(id);
    // const doc = this.afs.doc(`customers/${id}`);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<Customer>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as Customer;
        data.id = action.payload.id;
        return data;
      })
    );
  }


  addCustomer(c:Customer):any{
    this.customerCollection.add(c)
    .then((value: DocumentReference<Customer>) => {
      alert('customer add success');
    })
    .catch((reason:any) => {
      alert('no customer added - Error');
    });

  }

  updateCustomer(c:Customer){
    console.log(c);
    const doc:AngularFirestoreDocument<Customer> = this.customerCollection.doc(c.id);
    return doc.update(c)
    .then((_) => {
      alert('customer updated');
    })
    .catch((reason:any) => {
      alert("Error no customer updated");
    });
  }

  deleteCustomer(c:Customer){
    const doc:AngularFirestoreDocument<Customer> = this.customerCollection.doc(c.id);
    return doc.delete()
    .then((_) => {
      alert('customer deleted');
    })
    .catch((reason:any) => {
      alert("Error no customer deleted");
    });
  }



}
