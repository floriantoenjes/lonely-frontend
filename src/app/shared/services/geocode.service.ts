import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoLocation } from '../models/geoLocation';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GeocodeService {

    constructor(
        private http: HttpClient
    ) { }

    getCoordinates(location: string): Observable<GeoLocation> {
        return this.http.get<any>(`http://localhost:4280/${location}`)
            .pipe(
                map(response => {
                    const locationResult = response.results[0].geometry.location;
                    const geoLocation = new GeoLocation(locationResult.lat, locationResult.lng);

                    return geoLocation;
                })
            );
    }
}
