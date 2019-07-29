import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/services/contact.service';
import { Observable } from 'rxjs';
import { Profile } from '../shared/models/profile';
import { mergeMap } from 'rxjs/operators';
import { ProfileService } from '../shared/services/profile.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    contactsProfiles$: Observable<Profile[]>;

    constructor(
        private contactService: ContactService,
        private profileService: ProfileService
    ) { }

    ngOnInit() {
        this.contactsProfiles$ = this.contactService.getContacts().pipe(
            mergeMap(contacts => this.profileService.getProfilesByUsernames(contacts.map(contact => contact.username)))
        );
    }

}
