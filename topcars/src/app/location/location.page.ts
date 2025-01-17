import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  productForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  downloadURL: string = '';
uid :string="";
products: any[] = [];



  constructor(  private auth:AuthService, private router:Router, private fb:FormBuilder,private myauth:AngularFireAuth) {
    this.productForm = this.fb.group({
      type: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', [Validators.required, Validators.minLength(3)]],
      annee: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      imageFile: [null, Validators.required] // حقل الملف
    });
   }

  ngOnInit() {
    this.auth.getUserProducts().subscribe(data=>{
      this.products=data.reverse();
     })
   
  }


    // معالجة رفع الصورة
    onImageUpload(event: Event): void {
      const file = (event.target as HTMLInputElement).files?.[0]; // الحصول على الملف
      if (file) {
        this.productForm.patchValue({ imageFile: file }); // تحديث قيمة النموذج
        this.productForm.get('imageFile')?.updateValueAndValidity(); // تحديث حالة الحقل
  
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result; // عرض المعاينة
        };
        reader.readAsDataURL(file); // قراءة الصورة
      }
    }
  
    async onSubmit(): Promise<void> {
      if (this.productForm.valid) {
        try {
          const file = this.productForm.get('imageFile')?.value;
          const imageUrl = await this.auth.uploadImage(file); // رفع الصورة
          const user=this.myauth.authState.subscribe(userid=>{
            if (userid) {
              this.uid=userid.uid;
              const productData = {
                ...this.productForm.value,
                imageFile: imageUrl,
                uid:this.uid,
                date: new Date().toISOString(), 

              };
              this.auth.addProduct(productData)
      
              console.log('Produit ajouté :', productData);
              alert('Produit ajouté avec succès !');
              this.productForm.reset();
              this.imagePreview = null;
            } 

          })
         
        } 
        catch (error) {
          alert('Erreur lors du téléchargement de l\'image.');
          console.error(error);
        }
      }
       else {
        alert('Veuillez remplir tous les champs correctement.');
      }
    }
    

   

  
}
