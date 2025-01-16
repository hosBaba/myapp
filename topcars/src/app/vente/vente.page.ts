import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.page.html',
  styleUrls: ['./vente.page.scss'],
})
export class VentePage implements OnInit {

  products: any[] = [];
  file: File | null = null;
  downloadURL: string = '';
  type: string = '';
  model: string = '';
  annee: string="";
  price: string="";
uid :string="";
 timestamp = Date.now();



  constructor( private auth:AuthService,private myauth:AngularFireAuth) { }

  ngOnInit() {

    
       this.auth.getUserProducts().subscribe(data=>{
        this.products=data;
       })
     
  
      }
  
 
 
  //telecharger les fichies in firebase

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    if (this.file) {
      this.auth.uploadFile(this.file).subscribe((url) => {
        this.downloadURL = url;

        const userId=this.myauth.authState.subscribe(user=>{
          if (user) {
             this.uid=user.uid;
           
             const myProduct={
              type:this.type,
              model:this.model,
              annee:this.annee,
              price:this.price,
              imgUrl:this.downloadURL,
              uid:this.uid,
              date: this.timestamp,             }
             this.auth.addProduct(myProduct)
           
          }
         })
       
      });
    }
  }
  

   // Get all records
   getProducts() {
    this.auth.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  

   // Update an existing record
   updateRecord(recordKey: string, updatedData: any) {
    this.auth.updateRecord(recordKey, updatedData)
      .then(() => console.log('Record updated successfully!'))
      .catch(err => console.error('Error updating record:', err));
  }

  // Delete a record
  deleteRecord(recordKey: string) {
    this.auth.deleteRecord(recordKey)
      .then(() => console.log('Record deleted successfully!'))
      .catch(err => console.error('Error deleting record:', err));
  }

  async product (){
    const myProduct={
      type:this.type,
      model:this.model,
      annee:this.annee,
      price:this.price,
      imgUrl:this.auth.getPhotoURLs()
     }
     this.auth.addProduct(myProduct)
    
  }
}
