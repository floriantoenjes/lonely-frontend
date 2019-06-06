import { GeoLocation } from './geoLocation';

enum Sex {
    male,
    female
}

export class Profile {
    private id: string;

    private userId: string;

    private firstName: string;

    private lastName: string;

    private location: GeoLocation;

    private sex: Sex;

    private birthDate: Date;

    private pictureURL: string;

    private description: string;
}
