import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { Profile } from '../shared/models/profile';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

    ngOnInit() {
    }

    saveProfile(): void {
        const profile = this.form.value as Profile;
        this.profileService.saveProfile(profile).subscribe();
    }

}
