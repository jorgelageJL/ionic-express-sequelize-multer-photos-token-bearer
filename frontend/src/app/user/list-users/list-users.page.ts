import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {
  users: any = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.checkIfLogin();
  }

  async getAll() {
    this.users = await this.userService.getUsers();
  }

  ionViewWillEnter() {
    this.getAll();
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

  goToBicycles() {
    this.router.navigateByUrl("list-bicycles");
  }

  ngOnInit() {}

}
