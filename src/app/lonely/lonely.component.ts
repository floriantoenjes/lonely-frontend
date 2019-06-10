import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from '../shared/services/settings.service';
import { Settings } from '../shared/models/settings';

import * as moment from 'moment';
import { Profile } from '../shared/models/profile';
import { Observable, of } from 'rxjs';
import { LonelyService } from '../shared/services/lonely.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-settings',
    templateUrl: './lonely.component.html',
    styleUrls: ['./lonely.component.scss']
})
export class LonelyComponent implements OnInit {

    form: FormGroup;

    lonelyPeople$: Observable<Profile[]>;

    constructor(
        private fb: FormBuilder,
        private lonelyService: LonelyService,
        private settingsService: SettingsService
    ) {
        this.form = this.fb.group({
            lonelyDateTime: [],
            radius: [],
            meetUpAgeFrom: [],
            meetUpAgeTo: []
        });
    }

    ngOnInit(): void {
        this.settingsService.getSettings().pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
                return of({});
            } else {
                throw error;
            }
        })).subscribe((settings: Settings) => {
            this.form.patchValue(settings);
        });

        this.lonelyPeople$ = this.lonelyService.getLonelyPeople();
    }

    setLonely(): void {
        this.form.patchValue({
            lonelyDateTime: moment()
        });
        this.saveSettings();
    }

    unsetLonely(): void {
        this.form.patchValue({
            lonelyDateTime: null
        });
        this.saveSettings();
    }

    isLonely(): boolean {
        return moment().diff(this.form.value.lonelyDateTime, 'days') < 1;
    }

    saveSettings(): void {
        const settings = this.form.value as Settings;

        this.settingsService.saveSettings(settings).subscribe();
    }

}
