import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { Profile } from '../shared/models/profile';
import { GeoLocation } from '../shared/models/geoLocation';
import { Router } from '@angular/router';
import { GeocodeService } from '../shared/services/geocode.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private geocodeService: GeocodeService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.form = this.fb.group({
            firstName: [''],
            lastName: [''],
            city: [''],
            sex: [],
            birthDate: [],
            description: ['']
        });
    }

    ngOnInit(): void {
        this.profileService.getProfile().subscribe((profile: Profile) => {
            this.form.patchValue(profile);
        });
    }

    saveProfile(): void {
        const profile = this.form.value as Profile;

        this.geocodeService.getCoordinates(this.form.value.city).subscribe((geoLocation: GeoLocation) => {

            profile.location = geoLocation;

            this.profileService.saveProfile(profile).subscribe((profileResponse: Profile) => {
                if (profileResponse) {
                    this.router.navigate(['/lonely']);
                }
            });

        });
    }

}
