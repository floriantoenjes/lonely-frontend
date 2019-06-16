import { Component, OnInit } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';
import { AuthService } from '../shared/services/auth.service';
import { Message } from '../shared/models/message';
import { environment } from 'src/environments/environment';
import { ChatService } from '../shared/services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    contactName: string;
    messages: Message[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private chatService: ChatService
    ) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.contactName = params.get('contactName');
            this.chatService.getMessagesByContactName(this.contactName).subscribe(messages => {
                this.messages = messages;
                this.initSSE();
            });
        });
    }

    initSSE(): void {
        const source = new EventSourcePolyfill(`${environment.chatBasePath}/stream-sse`, {
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
