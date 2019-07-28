import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models/message';
import { environment } from 'src/environments/environment';
import { EventSourcePolyfill } from 'ng-event-source';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    receivedMessage$ = new Subject<Message>();

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
        this.initSSE();
    }

    getMessagesByContactName(contactName: string): Observable<Message[]> {
        return this.http.get<Message[]>(`${environment.chatBasePath}/messages/${contactName}`);
    }

    sendMessage(contactName: string, message: string): Observable<any> {
        return this.http.post(`${environment.chatBasePath}/send/${contactName}`, {
            message
        });
    }

    initSSE(): void {
        const source = new EventSourcePolyfill(`${environment.chatBasePath}/receiving-sse`, {
            headers: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });

        source.onmessage = e => {
            console.log(e);
            const message = JSON.parse(e.data) as Message;
            if (!message.heartbeat) {
                this.receivedMessage$.next(message);
            }
        };

        source.onopen = a => console.log('Opened', a);
        source.onerror = e => {
            console.log('Error', e);
            source.close();
        };
    }
}
