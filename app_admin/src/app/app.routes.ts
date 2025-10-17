import { Routes } from '@angular/router';
import { TripListComponent } from './components/trip-list/trip-list';
import { TripEditComponent } from './components/trip-edit/trip-edit';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/new', component: TripEditComponent },
  { path: 'trips/:code', component: TripEditComponent },
  { path: 'trips/new', component: TripEditComponent, canActivate: [authGuard] },
  { path: 'trips/:code', component: TripEditComponent, canActivate: [authGuard] },
];



