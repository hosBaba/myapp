import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Users } from '../users';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name:string=""
  password:string=""
  email:string=""
  uid:string=""
  id:string=""



  phoneNumber: string = '';
  
   
  constructor(private auth:AuthService,private router:Router ,private myauth:AngularFireAuth) { }
  
    ngOnInit() {
  
      
     
    }
  
    async register (){
  
      const user=await this.auth.register(this.email,this.password).then((res)=>{
       const userId=this.myauth.authState.subscribe(user=>{
        if (user) {
           this.uid=user.uid;
          console.log("user id:",this.uid)
          const myuser={
            name:this.name,
            phoneNumber:this.phoneNumber,
            id:this.uid
    
           }
           this.auth.addUser(myuser)
          
           this.router.navigateByUrl('/profile')
        } else {
          console.log("not logged")

        }
       })
        
      })
     } 

     
}
