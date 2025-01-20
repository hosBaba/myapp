import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Users } from '../users';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 
  uid:string=""
  productForm: FormGroup;



  
   
  constructor(private auth:AuthService,private router:Router ,private myauth:AngularFireAuth,private fb:FormBuilder) {

     this.productForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3)]],
          phoneNumber: ['', [Validators.required, Validators.minLength(3)]],
          email: [null, [Validators.required, Validators.min(1)]],
          password: ['', Validators.required],
        });
   }
  
    ngOnInit() {
  
      
     
    }
  
    async register (){
      if (this.productForm.valid) {
        const formValues = this.productForm.value;
        const email = formValues.email;
        const password = formValues.password; 
        const user=await this.auth.register(email,password).then((res)=>{
          const userId=this.myauth.authState.subscribe(user=>{
           if (user) {
              this.uid=user.uid;
               const myuser={
               ...this.productForm.value,
               id:this.uid
       
              }
              this.auth.addUser(myuser)
             
              this.router.navigateByUrl('/profile')
           } 
           else {
            alert('Cette adresse email existe');
            
          }
           
          })
           
         })
      } 
      
  
      
     } 

     
}
