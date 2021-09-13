import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { carDetails } from 'src/services/car-details.model';
import { CarsService } from 'src/services/cars.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  pageOfItems: Array<any> = [];

  constructor(private route: ActivatedRoute, public carService: CarsService) {
   }

  async ngOnInit(): Promise<void> {
    this.carService.list = await this.getAllcars();
    for (var car of this.carService.list)
    {
      var arr = car.imageUrl.split(',');
      car.imageUrl = arr[0];
    }
  }

    getAllcars(): any {
    return this.carService.getAllCars().toPromise( )
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

}
