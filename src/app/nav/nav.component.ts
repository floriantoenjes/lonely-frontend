import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isUserSignedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.isUserSignedIn$.subscribe(isUserSignedIn => this.isUserSignedIn = isUserSignedIn);
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['sign-in']);
  }

}
