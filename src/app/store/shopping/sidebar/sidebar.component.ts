import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categories: string[];
  categoryFilter: string[] = [];
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.categories = this.shoppingService.getAllCategories();
  }

  onFilter(event: any) {
    this.shoppingService.filterBooks(event.target.checked, event.target.defaultValue);
  }
}
