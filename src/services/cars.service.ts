import { HttpClient } from '@angular/common/http';
import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { carDetails, carFilter } from './car-details.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  public list: carDetails[] = [];
  public filterList!: carFilter;
  public formData: carDetails = new carDetails();
  urlBase = "https://localhost:44313/api/";

  constructor(private http:HttpClient) {
   }


  getAllCars() {
    return this.http.get<any>(this.urlBase + 'cars')
  }

  getCarDetails(id: number) {
    return this.http.get<any>(this.urlBase + 'cars/' + 'carDetails?id=' + id)
  }

  postCar(car: carDetails){
    return this.http.post(this.urlBase+'cars',car);
  }

  filterCars(manufacturer: string, type: string, year: number, minPrice: number, maxPrice: number, minOdometer: number, maxOdometer: number) {
    return this.http.get<any>(
      this.urlBase+'cars/'+'filter?'+'manufacturer='+manufacturer+'&year='+year+'&type='+type+'&minPrice='+minPrice+'&maxPrice='+maxPrice+'&minOdometer='+minOdometer+'&maxOdometer='+maxOdometer)
  }

  getCarFilters() {
    return this.http.get<any>(this.urlBase + 'cars/getFilters');
  }

  deleteCar(id: number){
    return this.http.delete(this.urlBase+'cars/carDetails?id='+id);
  }
}
