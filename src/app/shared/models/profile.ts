import { GeoLocation } from './geoLocation';

enum Sex {
    MALE,
    FEMALE
}

export class Profile {
    id: string;

    userId: string;

    firstName: string;

    lastName: string;

    location: GeoLocation;

    sex: Sex;

    birthDate: Date;

    pictureURL: string;

    description: string;
}
