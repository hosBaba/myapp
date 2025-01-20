import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  productForm:FormGroup

  constructor(private auth:AuthService,private router:Router,private fb:FormBuilder) { 
     this.productForm = this.fb.group({
              email: ['', [Validators.required, Validators.minLength(3)]],
              password: ['', [Validators.required, Validators.minLength(3)]],
            });
  }

  ngOnInit() {
  }

  async logIn(){
    const formValues = this.productForm.value;
    const email = formValues.email;
    const password = formValues.password;  
    const user=await this.auth.logIn(email,password).then(user=>{

      if (user) {
        this.router.navigateByUrl('/profile')
        this.productForm.reset();
      } else {
        alert('votre email ou mots de passe est invalide');


      }
    })

   
      
   
     }
 
}
