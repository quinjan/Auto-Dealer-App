import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarsService } from 'src/services/cars.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  manufacturer = "";
  type = "";
  year = 0;
  minPrice = 0;
  maxPrice = 0;
  minOdometer = 0;
  maxOdometer = 0;

  constructor(public carService: CarsService) { }

  async ngOnInit(): Promise<void> {
    this.carService.filterList = await this.getFilters();
    console.log(this.carService.filterList);
    console.log(this.carService.list);
  }

  getFilters(): any {
    return this.carService.getCarFilters().toPromise();
  }

  async filter(): Promise<void> {
    this.carService.list = await this.carService.filterCars(this.manufacturer, this.type, this.year, this.minPrice, this.maxPrice, this.minOdometer, this.maxOdometer).toPromise();
    for (var car of this.carService.list)
    {
      var arr = car.imageUrl.split(',');
      car.imageUrl = arr[0];
    }
  }

  async resetFilter(): Promise<void> {
    this.carService.list = await this.carService.getAllCars().toPromise();
    for (var car of this.carService.list)
    {
      var arr = car.imageUrl.split(',');
      car.imageUrl = arr[0];
    }

    this.manufacturer = "";
    this.type = "";
    this.year = 0;
    this.minPrice = 0;
    this.maxPrice = 0;
    this.minOdometer = 0;
    this.maxOdometer = 0;
  }
}
