import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _firestore = inject(Firestore);

  private readonly _collection = collection(this._firestore, PATH);

  loading = signal<boolean>(true);

  getTasks = toSignal((collectionData(this._collection, {idField: 'id'}) as Observable<Task[]>).pipe(
    tap(() => {
      this.loading.set(false);
    }),
    catchError(error => {
      this.loading.set(false);
      return throwError(() => error);
    })
  ), {
    initialValue: [],
  });

  create(task: TaskCreate) {
    return addDoc(this._collection, task);
  }

  constructor() {}
}
