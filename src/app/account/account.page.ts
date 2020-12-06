import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Chemicals, User } from '../models/user';
import { Chemical } from '../models/chemical';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { flatMap, retry, catchError, map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';
import { PasswordValidator } from './../validators/password.validator';
import * as $ from 'jquery';


@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  chemicalList: Chemical;
  data: User;
  image: String;
  user: User;

  constructor(
    private authService: AuthenticationService,
    public http: HttpClient,
    public apiService: ApiService,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public passwordValidator: PasswordValidator
  ) {
    this.image = '/assets/logo.png';
  }

  ionViewDidEnter() {
    $(':input').attr('data-lpignore', true);
    this.getUser();
    this.getChemicals();
  }


  getUser() {
    this.http.get(this.apiService.user_base_path + '/' + this.authService.token).subscribe((response: any) => {
      this.user = response;
    })
  }

  getChemicals() {
    this.http.get(this.apiService.chemicals_base_path).subscribe((response: any) => {
      this.chemicalList = response;
    })
  }

  submitForm(form) {
    let chemicals = new Chemicals(form.value.chlorine, form.value.ph_up, form.value.ph_down, form.value.alkalinity_up, form.value.alkalinity_down, form.value.calcium_up, form.value.calcium_down, form.value.cyanuric_acid_up);
    let user = new User(form.value.user_name, form.value.email, this.user.password, form.value.name, form.value.pool_gallons, form.value.pool_type, form.value.target_chlorine, form.value.target_ph, form.value.target_alkalinity, form.value.target_calcium, form.value.target_cyanuric_acid, chemicals);
    this.apiService.updateUser(this.authService.token, user).subscribe((response) => {
      this.router.navigate(['/tabs/readings']);
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }


  changePassword() {
    this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Change Password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          cssClass: 'passwordInput',
          attributes: {
            inputmode: 'decimal'
          }
        },
        {
          name: 'confirm',
          type: 'password',
          placeholder: 'Confirm',
          cssClass: 'passwordInput',
          attributes: {
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: data => {
            if (this.passwordValidator.isValid(data.password, data.confirm)) {
              this.user.password = data.password;
              this.apiService.updateUser(this.authService.token, this.user).subscribe((response) => {
                this.presentToast("Password changed successfully.");
              });
            }
            else {
              this.presentToast("Password doesn't meet requirements or doesn't match. Please try again.");
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }




  // getUserList() {
  //   this.apiService
  //     .getUser(this.authService.token)
  //     .subscribe((data: any) => {
  //       this.user = data;
  //     })
  // }

}

