import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage-angular'
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  initializedStorage: boolean = false;
  AUTH_SERVER_ADDRESS: string = 'http://localhost:8080/api/users';

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private authService: AuthService,
  ) {
    this.initializeStorage();
  }

  async initializeStorage(){
    if (!this.initializedStorage) await this.storage.create();
    this.initializedStorage = true;
  }

  isInitializedStorage(){
    return this.initializedStorage;
  }

  async getUsers() {
    const token = await this.authService.getToken();
    // console.log('TOKEN: ', token);
    const options = this.authService.getBearerHeaders(token);
    // console.log('OPTIONS: ', options);

    return firstValueFrom(
      this.httpClient.get(this.AUTH_SERVER_ADDRESS, options)
    );
  }
}
