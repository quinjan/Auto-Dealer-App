import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private readonly apiKey: string = "048dc41c1f2155dc04be30e12859b7f6";

  constructor(private readonly httpClient: HttpClient) { }

  uploadFile(file: File) {
    const formData = new FormData();

    formData.append('image', file);

    return this.httpClient.post('/upload', formData, {  params: { key: this.apiKey, reportProgress: true}});
  }
}
