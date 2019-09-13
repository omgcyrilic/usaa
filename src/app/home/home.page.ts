import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public foodForm: any;
  public results: any;
  public noResults: any;

  constructor(public foodService: FoodService, private router: Router) {
    this.results = [];
    this.noResults = false;
  }

  setFilteredItems(event: any) {
    const val = event ? event.target.value : '';
    const errors = 'errors';
    const item = 'item';

    if (val && val.trim() !== '') {
      this.results = this.foodService.searchFood(val).then(response => {
        if (response) {
          if (!response[errors]) {
            this.results = response[item].filter(i => {
              return i.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
            });
          }
          this.noResults = false;
        } else {
          this.noResults = true;
        }
      });
    } else {
      this.results = [];
      this.noResults = false;
    }
  }

  onClick(event: any) {
    this.router.navigate(['/detail', event.ndbno]);
  }
}
