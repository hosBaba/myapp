import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.page.html',
  styleUrls: ['./vente.page.scss'],
})
export class VentePage implements OnInit {
  productForm: FormGroup;

  products: any[] = [];
  file: File | null = null;
  downloadURL: string = '';
  type: string = '';
  model: string = '';
  annee: string="";
  price: string="";
uid :string="";
 timestamp = Date.now();
 imagePreview: string | ArrayBuffer | null = null;



  constructor( private auth:AuthService,private myauth:AngularFireAuth ,private fb:FormBuilder) {
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
