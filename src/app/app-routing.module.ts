import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignedInGuard } from './shared/guards/signed-in.guard';
import { SignedOutGuard } from './shared/guards/signed-out.guard';
import { LonelyComponent } from './lonely/lonely.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent, canActivate: [SignedOutGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [SignedOutGuard] },

  { path: 'profile', component: ProfileComponent, canActivate: [SignedInGuard] },
  { path: 'lonely', component: LonelyComponent, canActivate: [SignedInGuard] },
  { path: 'chat/:contactName', component: ChatComponent, canActivate: [SignedInGuard] },

  { path: '', redirectTo: 'lonely', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
