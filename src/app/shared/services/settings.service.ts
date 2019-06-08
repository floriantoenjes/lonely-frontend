import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settings } from '../models/settings';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(
        private http: HttpClient
    ) { }

    saveSettings(settings: Settings): Observable<Settings> {
        return this.http.post<Settings>(`${environment.resourceBasePath}/settings`, settings);
    }
}
