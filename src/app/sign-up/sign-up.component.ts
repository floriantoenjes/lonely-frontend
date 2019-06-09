import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    form: FormGroup;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.form = this.fb.group({
            username: [''],
            password: [''],
            password2: ['']
        });
    }

    signUp() {
        this.authService.signUp(this.form.value.username, this.form.value.password).subscribe((response: HttpResponse<any>) => {
            if (response.ok) {
                this.router.navigate(['/sign-in']);
            }
        });
    }
}
