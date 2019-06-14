import { GeoLocation } from './geoLocation';

enum Sex {
    MALE,
    FEMALE
}

export class Profile {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    city: string;
    location: GeoLocation;
    sex: Sex;
    birthDate: Date;
    pictureURL: string;
    description: string;

    distanceInKm: number;
}
