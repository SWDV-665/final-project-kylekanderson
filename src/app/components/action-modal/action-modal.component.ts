import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { Chemical } from '../../models/chemical';
import { AuthenticationService } from '../../services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Reading } from 'src/app/models/reading';

@Component({
    selector: 'app-action-modal',
    templateUrl: './action-modal.component.html',
    styleUrls: ['./action-modal.component.scss'],
})
export class ActionModalComponent implements OnInit {
    @Input() reading: Reading;
    user: User;
    chemicalList: Chemical[];
    recommendations: string[] = [];

    constructor(
        public http: HttpClient,
        public apiService: ApiService,
        private authService: AuthenticationService,
        private navParams: NavParams,
        private modalController: ModalController
    ) {}

    async ngOnInit() {
        // constuct the user and chemicalList objects
        await this.getUser();
        await this.getChemicals();
        
        // get our readings from the navParams
        this.reading = this.navParams.get('reading');

        // generate recommendations for each of the readings
        this.generateRecommendations(this.reading);
    }

    /**
     * dismiss the modal
     */
    closeModal() {
        this.modalController.dismiss();
    }

    /**
     * Evaluates a reading value to generate a water treatment recommendation
     * @param reading a water chemistry reading
     */
    generateRecommendations(reading: Reading) {
        // TODO: consider refactoring to eliminate repitition
        // iterate over the reading data
        for (let key in reading) {
            if (key == 'free_chlorine') {
                let chlorineReading = reading[key];
                // low chlorine
                if (chlorineReading < this.user.target_chlorine) {
                    this.recommendation(
                        this.user.target_chlorine,
                        chlorineReading,
                        this.user.pool_gallons,
                        this.user.chemicals[0].chlorine,
                        key
                    );
                }
                // can't treat a high chlorine level, so do nothing else here
            }
            if (key == 'ph') {
                let phReading = reading[key];
                // high pH
                if (phReading > this.user.target_ph) {
                    this.recommendation(
                        this.user.target_ph,
                        phReading,
                        this.user.pool_gallons,
                        this.user.chemicals[0].ph_down,
                        key
                    );
                }
                // low pH
                if (phReading < this.user.target_ph) {
                    this.recommendation(
                        this.user.target_ph,
                        phReading,
                        this.user.pool_gallons,
                        this.user.chemicals[0].ph_up,
                        key
                    );
                }
            }
            if (key == 'alkalinity') {
                let alkalinityReading = reading[key];
                // high alkalinity
                if (alkalinityReading > this.user.target_alkalinity) {
                    this.recommendation(
                        this.user.target_alkalinity,
                        alkalinityReading,
                        this.user.pool_gallons,
                        this.user.chemicals[0].alkalinity_down,
                        key
                    );
                }
                // low alkalinity
                if (alkalinityReading < this.user.target_alkalinity) {
                    this.recommendation(
                        this.user.target_alkalinity,
                        alkalinityReading,
                        this.user.pool_gallons,
                        this.user.chemicals[0].alkalinity_up,
                        key
                    );
                }
            }
            if (key == 'calcium') {
                let calciumReading = reading[key];
                // high calcium
                if (calciumReading > this.user.target_calcium) {
                    this.recommendation(
                        this.user.target_calcium,
                        calciumReading,
                        this.user.pool_gallons,
                        this.user.chemicals[0].calcium_down,
                        key
                    );
                }
                // low calcium
                if (calciumReading < this.user.target_calcium) {
                    this.recommendation(
                        this.user.target_calcium,
                        calciumReading,
                        this.user.pool_gallons,
                        this.user.chemicals[0].calcium_up,
                        key
                    );
                }
            }
            if (key == 'cyanuric_acid') {
                let cyanuricAcidReading = reading[key];
                // low cyanuric acid
                if (cyanuricAcidReading < this.user.target_cyanuric_acid) {
                    this.recommendation(
                        this.user.target_cyanuric_acid,
                        cyanuricAcidReading,
                        this.user.pool_gallons,
                        this.user.chemicals[0].cyanuric_acid_up,
                        key
                    );
                }
                // can't treat high cyanuric acid, so do nothing here
            }
        }
    }

    /**
     * Analyzes supplied parameters to generate a recommendation to improve water chemistry
     * @param target user's target chemical Level
     * @param actual actual chemical level (from reading)
     * @param volume pool volume (in gallons)
     * @param chemical chemical being adjusted
     * @param property the `chemical`'s effect on water chemistry
     */
    recommendation(target, actual, volume, chemical, property) {
        // find the user's chemical on our list of chemicals (chemicalList object)
        let foundChemical = this.chemicalList.find(i => i.name === chemical);

        let difference = target - actual;

        // the effect the chemical has on water chemistry
        let effect = foundChemical[property];

        // calculate an amount to add for the chemical
        let amountToAdd = Math.round((difference / effect * volume) / 1000) / 10;

        // generate a recommendation string and push it onto the recommendations array
        this.recommendations.push('Add ' + amountToAdd + 'oz of ' + chemical);
    }

    /**
     * Construct the user object from the service layer
     */
    async getUser() {
        let response = await this.apiService.getUser(this.authService.token);
        this.user = response;
    }

    /**
     * Construct the chemicalList object from the service layer
     */
    async getChemicals() {
        let response = await this.apiService.getChemicalList();
        this.chemicalList = response;
    }
}
