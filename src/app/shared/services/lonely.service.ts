import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LonelyService {

    constructor(
        private http: HttpClient
    ) { }

    getLonelyPeople(): Observable<Profile[]> {
        return this.http.get<Profile[]>(`${environment.resourceBasePath}/core/lonely-people`);
    }
}
