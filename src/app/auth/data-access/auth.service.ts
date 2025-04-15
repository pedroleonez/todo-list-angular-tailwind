import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _auth = inject(Auth);

  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider);
  }
}
