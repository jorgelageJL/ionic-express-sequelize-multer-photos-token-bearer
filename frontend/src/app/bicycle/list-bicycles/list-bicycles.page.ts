import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../../services/bicycle.service';
import { Router } from '@angular/router';
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
    this.checkIfLogin();
  }

  getAll() {
    this.bicycleService.getAllBicycles().subscribe(response => {
      this.bicycles = response;
    });
  }

  ionViewWillEnter() {
    this.getAll();
  }

  update(bicycle: any) {
    // console.log(bicycle)
    this.router.navigate(['/add-bicycle'], {
      state: { bicycle }
    });
  }

  delete(id: string) {
    this.bicycleService.deleteBicycle(id).subscribe(() => {
      this.getAll();
    });
  }
  // DECOMMENT:
  addBicycle(){
    this.router.navigateByUrl("add-bicycle");
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl("login");
  }
  
  checkIfLogin() {
    this.authService.isLoggedIn().then(loggedIn => {
      if (!loggedIn) {
        this.router.navigateByUrl("login");
      } 
    })
  }

  goToUsers() {
    this.router.navigateByUrl("list-users");
  }

  ngOnInit() { }
}
