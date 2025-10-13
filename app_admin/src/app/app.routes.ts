import { Routes } from '@angular/router';
import { TripListComponent } from './components/trip-list/trip-list';
import { TripEditComponent } from './components/trip-edit/trip-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/new', component: TripEditComponent },   
  { path: 'trips/:code', component: TripEditComponent }
];



