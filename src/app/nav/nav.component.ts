import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isUserSignedIn: boolean;

  newMessageCount = 0;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.isUserSignedIn$.subscribe(isUserSignedIn => this.isUserSignedIn = isUserSignedIn);
    this.chatService.receivedMessage$.subscribe(message => this.newMessageCount += 1);
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['sign-in']);
  }

}
