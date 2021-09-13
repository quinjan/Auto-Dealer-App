import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from 'src/services/cars.service';
import { carDetails } from 'src/services/car-details.model';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  public carId: number = 0;
  public car: carDetails = new carDetails();
  public urlStrings: string[] = [];
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public carsService: CarsService,
    public toastr: ToastrService) { }

  async ngOnInit(): Promise<void>{
    this.carId = Number(this.route.snapshot.params['id']);
    this.car = await this.carsService.getCarDetails(this.carId).toPromise();
    this.urlStrings = this.car.imageUrl.split(',');
    console.log(this.urlStrings)
    this.galleryOptions = [
      {
        width: '740px',
        height: '500px',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    for(var url of this.urlStrings)
    {
      this.galleryImages.push(
        {
          small: url,
          medium: url,
          big: url
        }
      )
    }
  }

  onBack(): void {
    this.router.navigate(['/'])
  }

  onPurchase(): void {
    if(confirm("Are you sure you want to buy "+ this.car.manufacturer+" "+this.car.model)) {
      this.carsService.deleteCar(this.carId).subscribe(
        data => {
          this.toastr.success('Car has been purchased!', 'Success!', {
            timeOut: 5000,});
            console.log(data);
            this.onBack();
        }
      );
    }
  }

  }
