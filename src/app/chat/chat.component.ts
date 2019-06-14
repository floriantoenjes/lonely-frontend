import { Component, OnInit } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';
import { AuthService } from '../shared/services/auth.service';
import { Message } from '../shared/models/message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    messages: Message[] =  [];

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        const source = new EventSourcePolyfill('http://localhost:5200/stream-sse', {
            headers: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });

        source.onmessage = e => {
            console.log(e);
            this.messages.push(JSON.parse(e.data));
        };

        source.onopen = a => console.log('Opened', a);
        source.onerror = e => {
            console.log('Error', e);
            source.close();
        };
    }

}
