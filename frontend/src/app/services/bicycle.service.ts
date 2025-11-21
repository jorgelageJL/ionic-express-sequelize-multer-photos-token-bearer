import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  endPoint = "http://localhost:8080/api/bicycles";

  constructor(private httpClient: HttpClient) { }

  getAllBicycles(){
    return this.httpClient.get(this.endPoint);
  }

  getOneBicycle(id: string){
    return this.httpClient.get(`${this.endPoint}/${id}`);
  }

  // DECOMMENT:
  createBicycle(bicycle: any, blob: any){
    // console.log(blob)
    let formData = new FormData();
    formData.append("brand", bicycle.brand);
    formData.append("model", bicycle.model);
    formData.append("filename", blob);

    return this.httpClient.post(this.endPoint, formData);
  }

  updateBicycle(bicycle: any/*, blob: any*/){
    // let formData = new FormData();
    // formData.append("brand", bicycle.brand);
    // formData.append("model", bicycle.model);
    // formData.append("filename", blob);
    return this.httpClient.put(`${this.endPoint}/${bicycle.id}`, bicycle);
  }

  deleteBicycle(id: string) {
    return this.httpClient.delete(`${this.endPoint}/${id}`);
  }
}
