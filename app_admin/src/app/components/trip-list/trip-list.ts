import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsService } from '../../services/trips';
import { Trip } from '../../models/trip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  error = '';

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.tripsService.getTrips().subscribe({
      next: (data) => { this.trips = data; this.loading = false; },
      error: (err) => { this.error = 'Failed to load trips'; this.loading = false; console.error(err); }
    });
  }

  trackByCode = (_: number, t: Trip) => t.code;
}
