import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navItem = [
    { path: 'home', display: "Home" },
    { path: 'shopping', display: "Shop" },
    { path: '#', display: "Blog" },
    { path: '#', display: "Contact" },
    { path: '#', display: "About" },
  ];
  currentRoute: string | undefined;
  totalBookInCart: number;
  constructor(private route: Router, private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe(item => {
      this.totalBookInCart = item.totalAmount
    })
  }

  openCart() {
    this.cartService.changeState('in');
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }
}
