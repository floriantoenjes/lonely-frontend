import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { Profile } from '../shared/models/profile';
import { GeoLocation } from '../shared/models/geoLocation';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService
    ) {
        this.form = this.fb.group({
            firstName: [''],
            lastName: [''],
            location: [''],
            sex: [],
            birthDate: [],
            description: ['']
        });
    }

    saveProfile(): void {
        const profile = this.form.value as Profile;
        profile.location = new GeoLocation(1, 1);

        this.profileService.saveProfile(profile).subscribe();
    }

}
