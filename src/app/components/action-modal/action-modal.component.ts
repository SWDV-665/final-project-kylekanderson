import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Chemicals, User } from '../../models/user';
import { Chemical } from '../../models/chemical';
import { AuthenticationService } from '../../services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { generate } from 'rxjs';
import { Reading } from 'src/app/models/reading';
import { timeout, filter } from 'rxjs/operators';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss'],
})
export class ActionModalComponent implements OnInit {

  @Input() reading: Reading;
  user: User;
  userResponse: any;
  chemicalList: Chemical;
  chemicalsResponse: any;
  recommendations: string[] = [];

  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    private authService: AuthenticationService,
    private navParams: NavParams,
    private modalController: ModalController
  ) {
  }

  async ngOnInit() {
    let result = await this.initializeData();

    this.reading = this.navParams.get('reading');
    this.generateRecommendations(this.reading);
  }

  async initializeData() {
    this.userResponse = await this.getUser();
    this.chemicalsResponse = await this.getChemicals();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  generateRecommendations(reading: Reading) {
    console.log('running');
    for (let key in reading) {
      if (key == 'free_chlorine') {
        let chlorineReading = reading[key];
        console.log(chlorineReading);
        console.log(this.user.target_chlorine);
        if (chlorineReading < this.user.target_chlorine) {
          console.log('low chlorine');
          this.recommendation(this.user.target_chlorine, chlorineReading, this.user.pool_gallons, this.user.chemicals[0].chlorine, 'free_chlorine');
        }
      }
      if (key == 'ph') {
        let phReading = reading[key];
        if (phReading > this.user.target_ph) {
          this.recommendation(this.user.target_ph, phReading, this.user.pool_gallons, this.user.chemicals[0].ph_down, 'ph');
        }
        if (phReading < this.user.target_ph) {
          this.recommendation(this.user.target_ph, phReading, this.user.pool_gallons, this.user.chemicals[0].ph_up, 'ph');
        }

      }
      if (key == 'alkalinity') {
        let alkalinityReading = reading[key];
        if (alkalinityReading > this.user.target_alkalinity) {
          console.log('high alkalinity');
        }
        if (alkalinityReading < this.user.target_alkalinity) {
          console.log('low alkalinity');
        }
      }
      if (key == 'calcium') {
        let calciumReading = reading[key];
        if (calciumReading > this.user.target_calcium) {
          console.log('high calcium');
        }
        if (calciumReading < this.user.target_calcium) {
          console.log('low calcium');
        }
      }
      if (key == 'cyanuric_acid') {
        let cyanuricAcidReading = reading[key];
        if (cyanuricAcidReading > this.user.target_cyanuric_acid) {
          console.log('high cyanuric acid');
        }
        if (cyanuricAcidReading < this.user.target_cyanuric_acid) {
          console.log('low cyanuric acid');
        }
      }
    }
  }

  // async getUser() {
  //   const response = this.http.get<User>(this.apiService.user_base_path + '/' + this.authService.token).toPromise();
  //   response.then(data => this.user = data);
  //   console.log(this.user);
  //   return response;
  // }

  // async getChemicals() {
  //   const response = this.http.get<Chemical>(this.apiService.chemicals_base_path).toPromise();
  //   response.then(data => this.chemicalList = data);
  //   console.log(this.chemicalList);
  //   return response;
  // }

  recommendation(target, actual, volume, chemical, property) {
    let foundChemical = this.chemicalList.filter(i => i.name == chemical);
    let difference = target - actual;
    let effect = foundChemical[0][property];
    console.log('foundChemical', foundChemical);
    console.log('difference', difference);
    console.log('effect', effect);
    console.log(volume);
    let amountToAdd = Math.round(difference * effect * volume / 10000);
    this.recommendations.push('Add ' + amountToAdd + 'oz of ' + chemical);
  }

  async getUser() {
    let response = await this.apiService.getUser(this.authService.token);
    console.log(response);
    this.user = response;
  }

  // async getUser() {
  //   this.http.get(this.apiService.user_base_path + '/' + this.authService.token).subscribe((response: any) => {
  //     this.user = response;
  //     console.log(this.user);
  //   })
  // }

  async getChemicals() {
    this.http.get(this.apiService.chemicals_base_path).subscribe((response: any) => {
      this.chemicalList = response;
      console.log(this.chemicalList);
    })
  }
}
