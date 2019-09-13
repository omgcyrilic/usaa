import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  public result: any;
  public data: any;
  public url: any;

  constructor(private http: HttpClient) {}

  searchFood(searchTerm: string) {
    if (searchTerm) {
      this.url = 'search/?format=json&sort=n&max=25&offset=0&q=' + searchTerm + '&api_key=' + environment.apiKey;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const list = 'list';
      return new Promise(resolve => {
        return this.http
          .get(environment.apiEndpoint + this.url, httpOptions)
          .pipe(
            map(response => {
              return response[list];
            })
          )
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    } else {
      console.error('searchTerm not provided');
    }
  }

  foodDetail(ndbno: number) {
    if (ndbno) {
      this.url = 'reports/?ndbno=' + ndbno + '&type=f&format=json&api_key=' + environment.apiKey;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const report = 'report';
      return new Promise(resolve => {
        return this.http
          .get(environment.apiEndpoint + this.url, httpOptions)
          .pipe(
            map(response => {
              return response[report];
            })
          )
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    } else {
      console.error('ndbno not provided');
    }
  }
}
