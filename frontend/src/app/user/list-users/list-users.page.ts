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
  ) {}

  async getAll() {
    this.users = await this.userService.getUsers();
  }

  ionViewWillEnter() {
    this.getAll();
  }

  logout() {
    this.authService.logout()
  }

  goToBicycles() {
    this.router.navigateByUrl("list-bicycles");
  }

  ngOnInit() {}

}
