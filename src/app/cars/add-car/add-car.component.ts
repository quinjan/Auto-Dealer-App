import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { carDetails } from 'src/services/car-details.model';
import { CarsService } from 'src/services/cars.service';
import { MatStepper } from '@angular/material/stepper';
import { FileUploadService } from 'src/services/file-upload.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})

export class AddCarComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader!:ElementRef;

  public Form!: FormGroup;
  isLinear = true;
  selectedFiles!: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  urls: string[] = [];
  submitted = false;

  filters = {
    types: [
      "SUV", "Sedan", "Pickup", "Van", "Crossover", "Hatchback"
    ],
    fuels: [
      "Gasoline", "Diesel"
    ],
    transmissions: [
      "AT", "MT", "CVT", "DCT", "AGT"
    ]

  }

  constructor(
    public carService: CarsService,
    private fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createCarForm();
  }


  ngOnSubmit(){
  }

  createCarForm(){
    this.Form = this.fb.group({
      Details: this.fb.group({
        Manufacturer: ["", Validators.required],
        Model: ["", Validators.required],
        Type: [this.filters.types[0], Validators.required],
        Year: ["", Validators.required],
        Odometer: [null, Validators.required],
        Price: [null, Validators.required]
      }),

      AdditionalDetails: this.fb.group({
        Transmission: [this.filters.transmissions[0], Validators.required],
        Color: ["", Validators.required],
        Fuel: [this.filters.fuels[0],Validators.required],
        Address: [null],
        City: [null]
      })
  })
  }

  resetForm(stepper: MatStepper) {
    stepper.reset();
    this.carService.formData = new carDetails();
    this.resetFiles();
  }

  onSubmit(stepper: MatStepper) {
    if (this.urls) {
      this.carService.formData.imageUrl = this.urls.join(',');
    }
    this.carService.postCar(this.carService.formData).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Car has been added!', 'Success!', {
        timeOut: 5000,});
        this.resetForm(stepper);
      }
    )
  }

  async onInput(e: Event){
    const input = e.target as HTMLInputElement;
    if (!input.files || !input.files[0])
      return;
    var json = await this.fileUploadService.uploadFile(input.files[0]).toPromise();
    console.log(json);
  }

  upload(idx: number, file: File): void {
    this.fileUploadService.uploadFile(file).subscribe(
      (event: any) => {
        console.log(event);
        this.progressInfos[idx] = event.success;
        console.log(event.data.image.url)
        this.urls.push(event.data.image.url);
      }
    )
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  getFileDetails(e: Event)
  {
    const input = e.target as HTMLInputElement;
    this.message = [];
    this.progressInfos = [];
    if (!input.files || !input.files[0])
      return;
    this.selectedFiles = input.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        this.previews.push(this.selectedFiles[i].name)
      }
    }
  }

  resetFiles()
  {
    this.previews = [];
    console.log(this.previews);
    this.fileUploader.nativeElement.value = null;
    this.urls = [];
    this.previews = [];
  }

  get Details() {
    return this.Form.controls.Details as FormGroup;
  }

  get AdditionalDetails() {
    return this.Form.controls.AdditionalDetails as FormGroup;
  }

  get Manufacturer() {
      return this.Details.controls.Manufacturer as FormControl;
  }

  get Model() {
      return this.Details.controls.Model as FormControl;
  }

  get Year() {
      return this.Details.controls.Year as FormControl;
  }

  get Odometer() {
      return this.Details.controls.Odometer as FormControl;
  }

  get Type() {
    return this.Details.controls.Type as FormControl;
  }

  get Price() {
      return this.Details.controls.Price as FormControl;
  }

  get Color() {
    return this.AdditionalDetails.controls.Color as FormControl;
  }

  get Transmission() {
    return this.AdditionalDetails.controls.Transmission as FormControl;
  }

  get Fuel() {
    return this.AdditionalDetails.controls.Fuel as FormControl;
  }
}
