import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private http: HttpClient
    ) { }

    saveProfile(profile: Profile): Observable<Profile> {
        return this.http.post<Profile>(`${environment.resourceBasePath}/profile`, profile);
    }

    getProfile(): Observable<Profile> {
        return this.http.get<Profile>(`${environment.resourceBasePath}/profile/my-profile`);
    }
}
