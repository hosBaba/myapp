import { Component } from '@angular/core';
import { Subscription  } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {
  user: User | null = null;
  private userSubscription: Subscription | undefined;

  constructor(private auth:AuthService,private router:Router) { }
  
  ngOnInit() {
   
  }

 
}
