import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  endPoint = "http://localhost:8080/api/bicycles";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  async getAllBicycles(){
    const token = await this.authService.getToken();
    // console.log('TOKEN: ', token);
    const options = this.authService.getBearerHeaders(token);
    // console.log('OPTIONS: ', options);
    return firstValueFrom(
      this.httpClient.get(this.endPoint, options)
    );
  }

  getOneBicycle(id: string){
    return this.httpClient.get(`${this.endPoint}/${id}`);
  }

  // DECOMMENT:
  async createBicycle(bicycle: any, blob: any){
    const token = await this.authService.getToken();
    // console.log('TOKEN: ', token);
    const options = this.authService.getBearerHeaders(token);
    // console.log('OPTIONS: ', options);
    // console.log(blob)
    let formData = new FormData();
    formData.append("brand", bicycle.brand);
    formData.append("model", bicycle.model);
    formData.append("filename", blob, "photo.jpg");

    return firstValueFrom(
      this.httpClient.post(this.endPoint, formData, options)
    );
  }

  async updateBicycle(bicycle: any, blob: any){
    const token = await this.authService.getToken();
    // console.log('TOKEN: ', token);
    const options = this.authService.getBearerHeaders(token);
    let formData = new FormData();
    formData.append("id", bicycle.id);
    formData.append("brand", bicycle.brand);
    formData.append("model", bicycle.model);
    if (blob) {
      formData.append("filename", blob, "photo.jpg");
    }
    return firstValueFrom(
      this.httpClient.put(`${this.endPoint}/${bicycle.id}`, formData, options)
    );
  }

  async deleteBicycle(id: string) {
    const token = await this.authService.getToken();
    // console.log('TOKEN: ', token);
    const options = this.authService.getBearerHeaders(token);
    return firstValueFrom(
      this.httpClient.delete(`${this.endPoint}/${id}`, options)
    );
  }
}
