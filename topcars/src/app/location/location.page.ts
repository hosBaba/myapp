import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

 
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
  }

  async logOut(){
    this.auth.logOut();
    this.router.navigateByUrl("/home")
        
    
         }
}
