import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss']
})
export class DetailPage implements OnInit {
  public foodDetails: any;
  public foodNutrients: any;
  public id: number;
  public sub: any;

  constructor(public foodService: FoodService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const ndbno = 'ndbno';
      const errors = 'errors';
      const food = 'food';
      const nutrients = 'nutrients';
      this.id = params[ndbno];
      this.foodDetails = this.foodService.foodDetail(this.id).then(response => {
        if (response) {
          if (!response[errors]) {
            this.foodDetails = response[food];
          }
        }
      });
      this.foodNutrients = this.foodService.foodDetail(this.id).then(response => {
        if (response) {
          if (!response[errors]) {
            this.foodNutrients = response[food][nutrients];
          }
        }
      });
    });
  }
}
