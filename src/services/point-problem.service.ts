import { Injectable } from '@angular/core';
import {
  ArmsNegative,
  headNegative,
  NeckNegative,
  backNegative,
  BodyNegative,
  globalNegative,
  InternalNegative,
  LegsNegative,
  SexsualNegative,
  SpiritNegative,
} from '../models/Simptom';
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
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class PointProblemService {
  headCollection!: AngularFirestoreCollection<headNegative>;
  headP$!: Observable<headNegative[]>;
  searchByName$: Subject<string> = new Subject<string>();
  dataFromSearchByName$!: Observable<any>;
  headP!: headNegative[];

  neckCollection!: AngularFirestoreCollection<NeckNegative>;
  neckP$!: Observable<NeckNegative[]>;
  necksrcByName: Subject<string> = new Subject<string>();
  neckFromSearchByName$!: Observable<any>;
  neckP!: NeckNegative[];

  armsCollection!: AngularFirestoreCollection<ArmsNegative>;
  armsP$!: Observable<ArmsNegative[]>;
  armssrcByName: Subject<string> = new Subject<string>();
  armsFromSearchByName$!: Observable<any>;
  armsP!: ArmsNegative[];

  backCollective!: AngularFirestoreCollection<backNegative>;
  backP$!: Observable<backNegative[]>;
  backsrcByName: Subject<string> = new Subject<string>();
  backFromSearchByName$!: Observable<any>;
  backP!: backNegative[];

  bodyCollection!: AngularFirestoreCollection<BodyNegative>;
  bodyP$!: Observable<BodyNegative[]>;
  bodysrcByName: Subject<string> = new Subject<string>();
  bodyFromSearchByName$!: Observable<any>;
  bodyP!: BodyNegative[];

  globalCollection!: AngularFirestoreCollection<globalNegative>;
  globalP$!: Observable<globalNegative[]>;
  glbsrcByName: Subject<string> = new Subject<string>();
  globalFromSearchByName$!: Observable<any>;
  glb$!:globalNegative[];

  internalCollection!: AngularFirestoreCollection<InternalNegative>;
  internalP$!: Observable<InternalNegative[]>;
  intrnlsrcByName: Subject<string> = new Subject<string>();
  intFromSearchByName$!: Observable<any>;
  internalP!: InternalNegative[];

  legsCollection!: AngularFirestoreCollection<LegsNegative>;
  legsP$!: Observable<LegsNegative[]>;
  legssrcByName: Subject<string> = new Subject<string>();
  legsFromSearchByName$!: Observable<any>;
  legsP!: LegsNegative[];

  sexsualCollection!: AngularFirestoreCollection<SexsualNegative>;
  sexsualP$!: Observable<SexsualNegative[]>;
  sxssrcByName: Subject<string> = new Subject<string>();
  sxsFromSearchByName$!: Observable<any>;
  sexsualP!: SexsualNegative[];

  spiritCollection!: AngularFirestoreCollection<SpiritNegative>;
  spiritP$!: Observable<SpiritNegative[]>;
  sprtsrcByName: Subject<string> = new Subject<string>();
  sprtFromSearchByName$!: Observable<any>;
  spiritP!: SpiritNegative[];

  constructor(private afs: AngularFirestore, public dialog: MatDialog) {
    this.headCollection = this.afs.collection<headNegative>('head');
    this.dataFromSearchByName$ = this.searchByName$.pipe(
      switchMap((term) => {
        return this.headCollection.ref.where('negativeSign', '==', term).get();
      })
    );

    this.headP$ = this.headCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<headNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as headNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.headP$.subscribe((list) => {
      list.sort((a:headNegative,b:headNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.headP = list;
    })



    //////    neck
    this.neckCollection = this.afs.collection<NeckNegative>('neck');
    this.neckFromSearchByName$ = this.necksrcByName.pipe(
      switchMap((term) => {
        return this.neckCollection.ref.where('negativeSign', '==', term).get();
      })
    );

    this.neckP$ = this.neckCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<NeckNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as NeckNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.neckP$.subscribe((list) => {
      list.sort((a:NeckNegative,b:NeckNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.neckP = list;
    })
    //// arms
    this.armsCollection = this.afs.collection<ArmsNegative>('arms');
    this.armsFromSearchByName$ = this.armssrcByName.pipe(
      switchMap((term) => {
        return this.armsCollection.ref.where('negativeSign', '==', term).get();
      })
    );

    this.armsP$ = this.armsCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<ArmsNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as ArmsNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.armsP$.subscribe((list) => {
      list.sort((a:ArmsNegative,b:ArmsNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.armsP = list;
    })
    //// back
    this.backCollective = this.afs.collection<backNegative>('back');
    this.backFromSearchByName$ = this.backsrcByName.pipe(
      switchMap((term) => {
        return this.backCollective.ref.where('negativeSign', '==', term).get();
      })
    );

    this.backP$ = this.backCollective.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<backNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as backNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.backP$.subscribe((list) => {
      list.sort((a:backNegative,b:backNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.backP = list;
    })
    //// body
    this.bodyCollection = this.afs.collection<BodyNegative>('body');
    this.bodyFromSearchByName$ = this.bodysrcByName.pipe(
      switchMap((term) => {
        return this.bodyCollection.ref.where('negativeSign', '==', term).get();
      })
    );

    this.bodyP$ = this.bodyCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<BodyNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as BodyNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.bodyP$.subscribe((list) => {
      list.sort((a:BodyNegative,b:BodyNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.bodyP = list;
    })
    //// global
    this.globalCollection = this.afs.collection<globalNegative>('global');
    this.globalFromSearchByName$ = this.glbsrcByName.pipe(
      switchMap((term) => {
        return this.globalCollection.ref
          .where('negativeSign', '==', term)
          .get();
      })
    );

    this.globalP$ = this.globalCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<globalNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as globalNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.globalP$.subscribe((list) => {
      list.sort((a:globalNegative,b:globalNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.glb$ = list;
    })

    //// internal
    this.internalCollection = this.afs.collection<InternalNegative>('internal');
    this.intFromSearchByName$ = this.intrnlsrcByName.pipe(
      switchMap((term) => {
        return this.internalCollection.ref
          .where('negativeSign', '==', term)
          .get();
      })
    );

    this.internalP$ = this.internalCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<InternalNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as InternalNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.internalP$.subscribe((list) => {
      list.sort((a:InternalNegative,b:InternalNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.internalP = list;
    })
    //// legs
    this.legsCollection = this.afs.collection<LegsNegative>('legs');
    this.legsFromSearchByName$ = this.legssrcByName.pipe(
      switchMap((term) => {
        return this.legsCollection.ref.where('negativeSign', '==', term).get();
      })
    );

    this.legsP$ = this.legsCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<LegsNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as LegsNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.legsP$.subscribe((list) => {
      list.sort((a:LegsNegative,b:LegsNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.legsP = list;
    })
    //// sexsual
    this.sexsualCollection = this.afs.collection<SexsualNegative>('sexsual');
    this.sxsFromSearchByName$ = this.sxssrcByName.pipe(
      switchMap((term) => {
        return this.sexsualCollection.ref
          .where('negativeSign', '==', term)
          .get();
      })
    );

    this.sexsualP$ = this.sexsualCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<SexsualNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as SexsualNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.sexsualP$.subscribe((list) => {
      list.sort((a:SexsualNegative,b:SexsualNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.sexsualP = list;
    })
    //// spirit
    this.spiritCollection = this.afs.collection<SpiritNegative>('spirit');
    this.sprtFromSearchByName$ = this.sprtsrcByName.pipe(
      switchMap((term) => {
        return this.spiritCollection.ref
          .where('negativeSign', '==', term)
          .get();
      })
    );

    this.spiritP$ = this.spiritCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<SpiritNegative>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as SpiritNegative;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.spiritP$.subscribe((list) => {
      list.sort((a:SpiritNegative,b:SpiritNegative) => {
        if (a.negativeSign < b.negativeSign) {
          return -1;
        }
        if (a.negativeSign > b.negativeSign) {
          return 1;
        }
        return 0;
      })
      this.spiritP = list;
    })
  }

  ///////////////////     functions head
  getHead(id: string): Observable<headNegative | null> {
    const doc = this.headCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<headNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as headNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addHead(pos: headNegative) {
    return this.headCollection
      .add(pos)
      .then((value: DocumentReference<headNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  updatePositive(pos: headNegative) {
    const doc: AngularFirestoreDocument<headNegative> = this.headCollection.doc(
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

  deleteHead(pos: headNegative) {
    const doc: AngularFirestoreDocument<headNegative> = this.headCollection.doc(
      pos.id
    );
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  /////////////////////// neck
  getNeck(id: string): Observable<NeckNegative | null> {
    const doc = this.neckCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<NeckNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as NeckNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addNeck(pos: NeckNegative) {
    return this.neckCollection
      .add(pos)
      .then((value: DocumentReference<NeckNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  deleteNeck(pos: NeckNegative) {
    const doc: AngularFirestoreDocument<NeckNegative> = this.neckCollection.doc(
      pos.id
    );
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  /////////////////////// arms
  getArms(id: string): Observable<ArmsNegative | null> {
    const doc = this.armsCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<ArmsNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as ArmsNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addArms(pos: ArmsNegative) {
    return this.armsCollection
      .add(pos)
      .then((value: DocumentReference<ArmsNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  deleteArms(pos: ArmsNegative) {
    const doc: AngularFirestoreDocument<ArmsNegative> = this.armsCollection.doc(
      pos.id
    );
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  /////////////////////// back
  getBack(id: string): Observable<backNegative | null> {
    const doc = this.backCollective.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<backNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as backNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addBack(pos: backNegative) {
    return this.backCollective
      .add(pos)
      .then((value: DocumentReference<backNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  deleteBack(pos: backNegative) {
    const doc: AngularFirestoreDocument<backNegative> = this.backCollective.doc(
      pos.id
    );
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  /////////////////////// body
  getbody(id: string): Observable<BodyNegative | null> {
    const doc = this.bodyCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<BodyNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as BodyNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addbody(pos: BodyNegative) {
    return this.bodyCollection
      .add(pos)
      .then((value: DocumentReference<BodyNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  deletebody(pos: BodyNegative) {
    const doc: AngularFirestoreDocument<BodyNegative> = this.bodyCollection.doc(
      pos.id
    );
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  /////////////////////// global
  getglobal(id: string): Observable<globalNegative | null> {
    const doc = this.globalCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<globalNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as globalNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addglobal(pos: globalNegative) {
    return this.globalCollection
      .add(pos)
      .then((value: DocumentReference<globalNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  deleteglobal(pos: globalNegative) {
    const doc: AngularFirestoreDocument<globalNegative> =
      this.globalCollection.doc(pos.id);
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  /////////////////////// internal
  getinternal(id: string): Observable<InternalNegative | null> {
    const doc = this.internalCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<InternalNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as InternalNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addinternal(pos: InternalNegative) {
    return this.internalCollection
      .add(pos)
      .then((value: DocumentReference<InternalNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  deleteinternal(pos: InternalNegative) {
    const doc: AngularFirestoreDocument<InternalNegative> =
      this.internalCollection.doc(pos.id);
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  /////////////////////// legs
  getlegs(id: string): Observable<LegsNegative | null> {
    const doc = this.legsCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<LegsNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as LegsNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addlegs(pos: LegsNegative) {
    return this.legsCollection
      .add(pos)
      .then((value: DocumentReference<LegsNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  deletelegs(pos: LegsNegative) {
    const doc: AngularFirestoreDocument<LegsNegative> = this.legsCollection.doc(
      pos.id
    );
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  /////////////////////// sexseul
  getsexseul(id: string): Observable<SexsualNegative | null> {
    const doc = this.sexsualCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<SexsualNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as SexsualNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addsexseul(pos: SexsualNegative) {
    return this.sexsualCollection
      .add(pos)
      .then((value: DocumentReference<SexsualNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  deletesexseul(pos: SexsualNegative) {
    const doc: AngularFirestoreDocument<SexsualNegative> =
      this.sexsualCollection.doc(pos.id);
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }

  /////////////////////// spirit
  getspirit(id: string): Observable<SpiritNegative | null> {
    const doc = this.spiritCollection.doc(id);
    return doc.snapshotChanges().pipe(
      map((action: Action<DocumentSnapshot<SpiritNegative>>) => {
        if (action.payload.exists === false) {
          return null;
        }
        const data = action.payload.data() as SpiritNegative;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  addspirit(pos: SpiritNegative) {
    return this.spiritCollection
      .add(pos)
      .then((value: DocumentReference<SpiritNegative>) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no positive added');
      });
  }

  deletespirit(pos: SpiritNegative) {
    const doc: AngularFirestoreDocument<SpiritNegative> =
      this.spiritCollection.doc(pos.id);
    return doc
      .delete()
      .then((_) => {
        alert('success');
      })
      .catch((err: any) => {
        alert('Error !!! no Negative updated');
      });
  }
}
