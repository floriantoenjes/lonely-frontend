import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignedInGuard } from './shared/guards/signed-in.guard';
import { SignedOutGuard } from './shared/guards/signed-out.guard';
import { LonelyComponent } from './lonely/lonely.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, canActivate: [SignedOutGuard] },

  { path: 'profile', component: ProfileComponent, canActivate: [SignedInGuard] },
  { path: 'lonely', component: LonelyComponent, canActivate: [SignedInGuard] },

  { path: '', redirectTo: 'profile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
