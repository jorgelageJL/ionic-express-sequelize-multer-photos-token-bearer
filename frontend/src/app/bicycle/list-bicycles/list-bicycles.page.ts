import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../../services/bicycle.service';
import { Router } from '@angular/router';
// import { Bicycle } from '../../auth/bicycle';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-bicycles',
  templateUrl: './list-bicycles.page.html',
  styleUrls: ['./list-bicycles.page.scss'],
})
export class ListBicyclesPage implements OnInit {
  bicycles: any = [];

  constructor(
    private bicycleService: BicycleService,
    private router: Router,
    private authService: AuthService,
  ) {
    // this.checkIfLogin();
  }

  async getAll() {
    this.bicycles = await this.bicycleService.getAllBicycles();
  }

  ionViewWillEnter() {
    this.getAll();
  }

  update(bicycle: any) {
    // console.log(bicycle)
    this.router.navigate(['add-bicycle'], {
      state: { bicycle }
    });
  }

  async delete(id: string) {
    await this.bicycleService.deleteBicycle(id);
    this.getAll();
  }
  // DECOMMENT:
  addBicycle(){
    this.router.navigateByUrl("add-bicycle");
  }

  logout() {
    this.authService.logout()
  }

  goToUsers() {
    this.router.navigateByUrl("list-users");
  }

  ngOnInit() { }
}
