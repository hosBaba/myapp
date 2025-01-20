import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase ,} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable, switchMap } from 'rxjs';
import { getStorage, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { SharedService } from '../shared.service';
import {  User } from 'firebase/auth';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPath = '/users';
  private productPath = '/products';
  isUploading = false; // حالة الرفع


  private mystorage = getStorage();

  constructor(private shared:SharedService, private auth:AngularFireAuth,private data:AngularFireDatabase, private storage:AngularFireStorage, private router:Router) {
    

}
 
  

async register(email:string, password:string){

  try {
  const user= await this.auth.createUserWithEmailAndPassword(email,password);
  return user;
    
  } catch (error) {
    return null;
  }
}

async logIn(email:string, password:string){

  try {
    const user=await this.auth.signInWithEmailAndPassword(email,password);
    return user;
    
  } catch (error) {
    return null;
  }

}

logOut(){
  return this.auth.signOut();

}

 

//add users
 addUser(user: any): void {
  this.data.list(this.dbPath).push(user);
}
//add products
 addProduct(product: any): void {
  this.data.list(this.productPath).push(product);
}

  // Read (Get all records)
  getProducts(): Observable<any[]> {
    return this.data.list('products', (ref) => ref.orderByChild('date')) // Trie par champ "price"
    .valueChanges();
  }

    // Read (Get a record by key)
    getUser(key: string): Observable<any> {
      return this.data.object(`${this.dbPath}/${key}`).valueChanges();
    }

    getProduct(key: string): Observable<any> {
      return this.data.object(`${this.productPath}/${key}`).valueChanges();
    }

    getUserProducts(): Observable<any[]> {
      return this.auth.authState.pipe(
        switchMap((user) => {
          if (user) {
            return this.data
              .list('products', (ref) => ref.orderByChild('uid').equalTo(user.uid))
              .valueChanges();
          } else {
            return [];
          }
        })
      );
    }
  
  
    // Update
    updateRecord(key: string, data: any): Promise<void> {
      return this.data.object(`${this.dbPath}/${key}`).update(data);
    }
  
    // Delete
    deleteRecord(key: string): Promise<void> {
      return this.data.object(`${this.dbPath}/${key}`).remove();
    }



 // Méthode pour uploader une image

 uploadFile(file: File): Observable<string> {
  const filePath = `photos/${Date.now()}_${file.name}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);

  return new Observable((observer) => {
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          observer.next(url);
          observer.complete();
        });
      })
    ).subscribe();
  });
}



uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const filePath = `photos/${Date.now()}_${file.name}`; // مسار الصورة
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.isUploading = true; // تغيير حالة الرفع

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            (url) => {
              this.isUploading = false;
              resolve(url); // إرجاع رابط الصورة
            },
            (error) => reject(error)
          );
        })
      )
      .subscribe();
  });
}


}


    
