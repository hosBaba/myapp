import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string=""
  password:string=""


  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }

  async logIn(){
    const user=await this.auth.logIn(this.email,this.password).then(user=>{

      if (user) {
        this.router.navigateByUrl('/profile')
      } else {
        this.router.navigateByUrl('/home')

      }
    })

   
      
   
     }
 
}
