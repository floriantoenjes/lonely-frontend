import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from '../shared/services/settings.service';
import { Settings } from '../shared/models/settings';

import * as moment from 'moment';

@Component({
    selector: 'app-settings',
    templateUrl: './lonely.component.html',
    styleUrls: ['./lonely.component.scss']
})
export class LonelyComponent implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private settingsService: SettingsService
    ) {
        this.form = this.fb.group({
            id: [],
            lonelyDateTime: [],
            radius: [],
            meetUpAgeFrom: [],
            meetUpAgeTo: []
        });
    }

    ngOnInit(): void {
        this.settingsService.getSettings().subscribe(settings => {
            this.form.patchValue(settings);
        });
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
