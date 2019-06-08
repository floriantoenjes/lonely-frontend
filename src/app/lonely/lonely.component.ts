import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LonelyService } from '../shared/services/lonely.service';
import { Settings } from '../shared/models/settings';

import * as moment from 'moment';

@Component({
    selector: 'app-lonely',
    templateUrl: './lonely.component.html',
    styleUrls: ['./lonely.component.scss']
})
export class LonelyComponent {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private lonelyService: LonelyService
    ) {
        this.form = this.fb.group({
            lonelyDateTime: [],
            radius: [],
            meetUpAgeFrom: [],
            meetUpAgeTo: []
        });
    }

    setLonely(): void {
        this.form.patchValue({
            lonelyDateTime: moment()
        });
    }

    isLonely(): boolean {
        return moment().diff(this.form.value.lonelyDateTime, 'days') < 1;
    }

    saveSettings(): void {
        const settings = this.form.value as Settings;

        this.lonelyService.saveSettings(settings).subscribe();
    }

}
