import { Component, OnInit } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';
import { AuthService } from '../shared/services/auth.service';
import { Message } from '../shared/models/message';
import { environment } from 'src/environments/environment';
import { ChatService } from '../shared/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Profile } from '../shared/models/profile';
import { Observable } from 'rxjs';
import { ProfileService } from '../shared/services/profile.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    username: string;

    contactProfile$: Observable<Profile>;

    form: FormGroup;

    messages: Message[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private chatService: ChatService,
        private fb: FormBuilder,
        private profileService: ProfileService
    ) {
        this.form = this.fb.group({
            message: ['']
        });
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.username = params.get('contactName');

            this.contactProfile$ = this.profileService.getProfile(this.username);

            this.chatService.getMessagesByContactName(this.username).subscribe(messages => {
                this.messages = messages;
                this.initSSE();
            });
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
            if (!message.heartbeat && !this.messageAlreadyReceived(message)) {
                this.messages.push(message);
            }
        };

        source.onopen = a => console.log('Opened', a);
        source.onerror = e => {
            console.log('Error', e);
            source.close();
        };
    }

    sendMessage(): void {
        this.chatService.sendMessage(this.username, this.form.value.message).subscribe();
    }

    messageAlreadyReceived(message: Message): boolean {
        return this.messages.filter(msg => msg.id === message.id).length > 0;
    }

}
