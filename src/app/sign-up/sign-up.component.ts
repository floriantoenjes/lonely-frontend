import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    form: FormGroup;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.form = fb.group({
            username: [''],
            password: [''],
            password2: ['']
        });
    }

    signUp() {
        this.authService.signUp(this.form.value.username, this.form.value.password).subscribe();
    }
}
