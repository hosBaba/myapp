import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public user$: Observable<User | null> = of(null); // Initialisation avec 'of(null)'

  constructor(){}
 
  commonMethod( ) { 
    const auth = getAuth();
    this.user$ = new Observable<User | null>((observer) => {
        onAuthStateChanged(auth, (user) => {
            observer.next(user);
        });
    });
  }

  // ... autres méthodes d'authentification (signInWithEmailAndPassword, signOut, etc.)
}
  

