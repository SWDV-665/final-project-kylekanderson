import { Component, OnInit } from '@angular/core';
import { Reading } from '../../models/reading';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { ModalController } from '@ionic/angular';
import { ActionModalComponent } from '../../components/action-modal/action-modal.component';


@Component({
  selector: 'app-readings',
  templateUrl: 'readings.page.html',
  styleUrls: ['readings.page.scss']
})
export class ReadingsPage implements OnInit {

  data: Reading;

  image: String;

  constructor(
    public apiService: ApiService,
    public router: Router,
    private authService: AuthenticationService,
    private modalController: ModalController
  ) {

    this.data = new Reading();

    this.image = '/assets/logo.png';
  }
  ngOnInit() {

  }

  submitForm() {
    this.data.user_id = this.authService.token;
    this.apiService.createReading(this.data).subscribe((response) => {
      this.data = new Reading();
    });
    this.actionModal();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async actionModal() {
    const modal = await this.modalController.create({
      component: ActionModalComponent,
      componentProps: {reading: this.data},
      cssClass: 'setting-modal',
      backdropDismiss: false,
    });
    modal.present();
    await modal.onWillDismiss().then(() => {
      this.router.navigate(['/tabs/historicaldata']);
    })
  }
}