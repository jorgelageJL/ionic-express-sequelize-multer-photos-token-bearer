import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BicycleService } from '../../services/bicycle.service';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
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
  originalImage: string = "";

  constructor(
    private bicycleService: BicycleService,
    private router: Router,
    // private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private authService: AuthService,
  ) {
    this.bicycleForm = this.formBuilder.group({
      id: null,
      brand: ['', Validators.required],
      model: ['', Validators.required],
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
      this.originalImage = `http://localhost:8080/images/${this.bicycle.filename}`
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

  imageChanged() {
    // Si capturedPhoto existe y su filename es diferente al original
    return this.capturedPhoto && this.capturedPhoto != this.originalImage;
  }

  async create() {
    // console.log(this.bicycleForm.value)
    if (!this.bicycleForm.valid || this.capturedPhoto === "") {
      console.log('Please provide all the required values!')
      return;
    }
    // DECOMMENT:
    let blob: any = null;
    if (this.imageChanged()) {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }

    if (this.bicycleForm.value.filename) {
      await this.bicycleService.updateBicycle(this.bicycleForm.value, blob);
    } else {
      await this.bicycleService.createBicycle(this.bicycleForm.value, blob);
    }
    
    this.router.navigateByUrl("list-bicycles");
  }

  logout() {
    this.authService.logout()
  }
  
  goToBicycles() {
    this.router.navigateByUrl("list-bicycles");
  }

  goToUsers() {
    this.router.navigateByUrl("list-users");
  }

  ngOnInit() { }
}
