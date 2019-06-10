import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoLocation } from '../models/geoLocation';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GeocodeService {
    private geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    private googleAPIKey = `&key=${environment.googleAPIKey}`;

    constructor(
        private http: HttpClient
    ) { }

    getCoordinates(location: string): Observable<GeoLocation> {
        return this.http.get<any>(`${this.geocodeURL}${location}${this.googleAPIKey}`)
            .pipe(
                map(response => {
                    const locationResult = response.results[0].geometry.location;
                    const geoLocation = new GeoLocation(locationResult.lat, locationResult.lng);

                    return geoLocation;
                })
            );
    }
}
