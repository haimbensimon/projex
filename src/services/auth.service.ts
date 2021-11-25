import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, Role } from '../models/User';
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
export class AuthService {

  users$!: Observable<User[]>;
  usersCollection!: AngularFirestoreCollection<User>;
  myRole!: boolean;
  curUser!: string;
  oilp?:number;
  pointp?:number;
  doublep?:number;
  id?:string;
  thisUser!:User;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,

  ) {
    this.usersCollection = this.afs.collection('users');

    this.users$ = this.usersCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<User>[]) => {
        return actions.map((u) => {
          const data = u.payload.doc.data() as User;
          data.id = u.payload.doc.id;
          this.id = data.id;
          return data;
        });
      })
    );
  }

  signIn(email: string, password: string) {
    const newUser: User = {
      email: email,
      roles: {
        admin: false,
      },
      oilp:1,
      pointp:1,
      doublep:1,
    };
    this.addUser(newUser);
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('success');
      })
      .catch((err) => {
        alert('failed');
      });
  }

  login(email: string, password: string) {
    return new Promise((res, rej) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(
        (userData) => res(userData),
        (err) => rej(err)
      );
    });
  }

  getAuth() {
    return this.afAuth.authState;
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  getUser(id: string): Observable<User | null> {
    const doc = this.usersCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<User>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as User;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addUser(user: User) {
    return this.usersCollection
      .add(user)
      .then((value: DocumentReference<User>) => {
       alert('added')
      })
      .catch((reason: any) => {
        alert('failed');
      });
  }
  updateUser(u:User){
    const doc:AngularFirestoreDocument<User> = this.usersCollection.doc(u.id)
    return doc.update(u)
    .then((_) => {
      alert('user update');
    })
    .catch((err) => {
      alert('User Error');
    })
  }
}
