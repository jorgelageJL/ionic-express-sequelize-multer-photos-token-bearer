import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BicycleService } from '../../services/bicycle.service';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-bicycle',
  templateUrl: './add-bicycle.page.html',
  styleUrls: ['./add-bicycle.page.scss'],
})
export class AddBicyclePage implements OnInit {
  bicycle: any; 
  bicycleForm: FormGroup;
  // isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(
    private bicycleService: BicycleService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private authService: AuthService,
  ) {
    this.checkIfLogin();
    this.bicycleForm = this.formBuilder.group({
      id: null,
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      filename: ''
    })
    this.updateBicycleForm();
  }

  updateBicycleForm() {
    // Aquí recibimos los datos si vienes desde update()
    const nav = this.router.getCurrentNavigation();
    this.bicycle = nav?.extras.state?.['bicycle'];
    // Si vienen datos (modo edición)
    if (this.bicycle) {
      this.bicycleForm.reset({
        id: this.bicycle.id,
        brand: this.bicycle.brand,
        model: this.bicycle.model,
        filename: this.bicycle.filename,
      })
      this.capturedPhoto = `http://localhost:8080/images/${this.bicycle.filename}`
    }
    // console.log(this.bicycleForm.value)
  }

  // ionViewWillEnter() {
  //   this.bicycleForm.reset();
  //   this.capturedPhoto = `http://localhost:8080/images/${this.bicycle.filename}`;
  // }

  // getFormControl(field: string) {
  //   return this.bicycleForm.get(field);
  // }

  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath ? data.webPath : "";
    });
  }

  pickImage() {
    // DECOMMENT:
    this.photoService.pickImage().then(data => {
      console.log(`rutaaa: ${data.webPath}`)
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    // DECOMMENT:
    this.capturedPhoto = "";
  }

  areEquals() {
    return this.bicycle != undefined && this.bicycle != null
      && Object.is(this.bicycle.brand, this.bicycleForm.value.brand)
      && Object.is(this.bicycle.model, this.bicycleForm.value.model)
      && Object.is(this.bicycle.filename, this.bicycleForm.value.filename)
  }

  update(/*blob: any*/) {
    // console.log(this.bicycleForm.value)
    this.bicycleService.updateBicycle(this.bicycleForm.value/*, blob*/).subscribe(data => {
      // console.log("Photo sent!");
      this.router.navigateByUrl("/list-bicycles");
    })
  }

  async create() {
    console.log(this.bicycleForm.value)
    // const equals = this.areEquals();
    if (!this.bicycleForm.valid || this.capturedPhoto === "") {
      console.log('Please provide all the required values!')
      return;
    }
    if (this.bicycleForm.value.filename != '') {
      return this.update(/*blob*/);
    }
    // console.log(`anterior: ${this.bicycle}`)
    // console.log(this.bicycleForm.value)
    // DECOMMENT:
    let blob = null;
    const response = await fetch(this.capturedPhoto);
    blob = await response.blob();
    

    this.bicycleService.createBicycle(this.bicycleForm.value, blob).subscribe(data => {
      // console.log("Photo sent!");
      this.router.navigateByUrl("/list-bicycles");
    })
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

  goToUsers() {
    this.router.navigateByUrl("list-users");
  }

  ngOnInit() { }
}
