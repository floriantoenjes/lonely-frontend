import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-lonely',
    templateUrl: './lonely.component.html',
    styleUrls: ['./lonely.component.scss']
})
export class LonelyComponent {

    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            lonelyDateTime: [],
            radius: [],
            meetUpAgeFrom: [],
            meetUpAgeTo: []
        });
    }

}
