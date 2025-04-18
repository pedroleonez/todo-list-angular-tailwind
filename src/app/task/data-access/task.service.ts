import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthStateService } from '../../shared/data-access/auth-state.service';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';

@Injectable()
export class TaskService {
  private readonly _firestore = inject(Firestore);
  private readonly _authState = inject(AuthStateService);

  private readonly _collection = collection(this._firestore, PATH);
  private readonly _query = query(
    this._collection,
    where('userId', '==', this._authState.currentUser?.uid)
  )

  loading = signal<boolean>(true);

  getTasks = toSignal(
    (
      collectionData(this._query, { idField: 'id' }) as Observable<Task[]>
    ).pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError((error) => {
        this.loading.set(false);
        return throwError(() => error);
      })
    ),
    {
      initialValue: [],
    }
  );

  constructor() {
    console.log(this._authState.currentUser);
  }

  getTask(id: string) {
    const docRef = doc(this._collection, id);
    return getDoc(docRef);
  }

  create(task: TaskCreate) {
    return addDoc(this._collection, {
      ...task,
      userId: this._authState.currentUser?.uid,
    });
  }

  update(id: string, task: TaskCreate) {
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, {
      ...task,
      userId: this._authState.currentUser?.uid,
    });
  }

    delete(id: string) {
    const docRef = doc(this._collection, id);
    return deleteDoc(docRef);
  }
}
