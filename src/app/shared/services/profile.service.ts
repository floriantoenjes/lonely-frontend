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
        return this.http.post<Profile>(`${environment.resourceBasePath}/profiles`, profile);
    }

    getSignedInUserProfile(): Observable<Profile> {
        return this.http.get<Profile>(`${environment.resourceBasePath}/profiles/my-profile`);
    }

    getProfile(username: string): Observable<Profile> {
        return this.http.get<Profile>(`${environment.resourceBasePath}/profiles/by-username/${username}`);
    }

    getProfilesByUsernames(usernames: string[]): Observable<Profile[]> {
        return this.http.post<Profile[]>(`${environment.resourceBasePath}/profiles/by-usernames`,
            usernames
        );
    }
}
