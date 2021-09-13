import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, NgForm, NgModel, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MaterialModule } from './material-module';
import { JwPaginationComponent, JwPaginationModule } from 'jw-angular-pagination';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarCardComponent } from './cars/car-card/car-card.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarsService } from 'src/services/cars.service';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { CarFilterComponent } from './cars/car-filter/car-filter.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FileUploadService } from 'src/services/file-upload.service';
import { ToastrModule } from 'ngx-toastr';


const appRoutes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'car-details/:id', component: CarDetailsComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarCardComponent,
    CarListComponent,
    AddCarComponent,
    CarDetailsComponent,
    CarFilterComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxGalleryModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    JwPaginationModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CarsService,
    FileUploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
