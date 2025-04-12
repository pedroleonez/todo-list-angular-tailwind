import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'todo-list-e0082',
        appId: '1:304269247917:web:0a5386144f701352fe8d24',
        storageBucket: 'todo-list-e0082.firebasestorage.app',
        apiKey: 'AIzaSyCOobhGckum3vjD_cHaw-rr-y4nZxfpYCo',
        authDomain: 'todo-list-e0082.firebaseapp.com',
        messagingSenderId: '304269247917',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
