import { Component, OnInit } from '@angular/core';
import { Message } from '../shared/models/message';
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
                this.chatService.receivedMessages$.subscribe(message => {
                    if (!this.messageAlreadyReceived(message)) {
                        this.messages.push(message);
                    }
                });
            });
        });
    }



    sendMessage(): void {
        this.chatService.sendMessage(this.username, this.form.value.message).subscribe();
    }

    messageAlreadyReceived(message: Message): boolean {
        return this.messages.filter(msg => msg.id === message.id).length > 0;
    }

}
