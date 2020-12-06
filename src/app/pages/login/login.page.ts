import { AuthenticationService } from './../../services/authentication.service';
import { TOKEN_KEY } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;


const { BiometricAuth } = Plugins;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.checkToken();
  }

  async checkToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    console.log(token);

    if (token.value !== null) {
      this.getBiometrics();
    }

  }

  async getBiometrics() {
    const available = await BiometricAuth.isAvailable()
    if (available.has) {
      const authResult = await BiometricAuth.verify({
        reason: 'Please authenticate to login',
        title: 'Biometric login',
        subTitle: 'Please authenticate to login',
        description: 'This app uses biometric authentication to login'
      })
      if (authResult.verified) {
        this.authService.isAuthenticated.next(true);
        this.authService.loadToken();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
        // fail authentication
      }
    } else {
      // biometric not available
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        console.log(res);
        if (res._id) {
          await loading.dismiss();
          await Storage.set({ key: TOKEN_KEY, value: res._id });
          const authTokenExists = await Storage.get({ key: TOKEN_KEY });
          console.log(authTokenExists);
          this.authService.token = res._id;
          this.authService.isAuthenticated.next(true);
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        }
        else {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Login failed',
            message: res,
            buttons: ['OK'],
          });
          await alert.present();
        }
      }
    );
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  goToRegistration() {
    this.router.navigate(['/register']);
  }
}