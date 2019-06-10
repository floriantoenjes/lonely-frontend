import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { LonelyComponent } from './lonely/lonely.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LonelyPersonComponent } from './lonely/lonely-person/lonely-person.component';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        ProfileComponent,
        LonelyComponent,
        SignUpComponent,
        LonelyPersonComponent
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: environment.googleAPIKey
        }),
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatMomentDateModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
