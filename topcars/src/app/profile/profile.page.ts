import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription  } from 'rxjs';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  
  products: any[] = [];
  isLoading = true;
  filteredProducts: any[] = [];
  constructor(private auth:AuthService,private router:Router) {
   
   }

 async ngOnInit() {
  this.refreshPage
  this.auth.getProducts().subscribe(data=>{
    this.products=data.reverse();
    this.filteredProducts = [...this.products];
   });  }

  //refrecher la page
  refreshPage() {
    window.location.reload();
  }

 // Filtrer les produits selon la recherche
 filterProducts(event: any) {
  const searchTerm = event.target.value.toLowerCase();

  if (searchTerm) {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  } else {
    this.filteredProducts = [...this.products]; // Réinitialiser la liste
  }
}

  async logOut(){
this.auth.logOut();
this.router.navigateByUrl("/home")
    

     }
    
}
