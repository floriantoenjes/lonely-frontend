import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(
        private http: HttpClient
    ) { }

    getMessagesByContactName(contactName: string): Observable<Message[]> {
        return this.http.get<Message[]>(`${environment.chatBasePath}/messages/${contactName}`);
    }
}
