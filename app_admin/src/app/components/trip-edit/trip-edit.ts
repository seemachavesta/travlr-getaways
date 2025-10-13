import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TripsService } from '../../services/trips';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './trip-edit.html',
  styleUrls: ['./trip-edit.css']
})
export class TripEditComponent implements OnInit {
  form!: FormGroup;
  code = '';
  isNew = false;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService
  ) {}

  ngOnInit(): void {
    const codeParam = this.route.snapshot.paramMap.get('code');
    this.isNew = !codeParam || codeParam.toUpperCase() === 'NEW';
    this.code = (codeParam || '').toUpperCase();

    this.form = this.fb.group({
      code: [{ value: this.isNew ? '' : this.code, disabled: !this.isNew }, [Validators.required]],
      title: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]]
    });

    if (!this.isNew) {
      this.loading = true;
      this.tripsService.getTripByCode(this.code).subscribe({
        next: (t: Trip) => { this.form.patchValue(t); this.loading = false; },
        error: (e) => { this.error = 'Failed to load trip'; this.loading = false; console.error(e); }
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;
    const payload: Trip = { ...this.form.getRawValue() }; // includes code when enabled in "new" mode

    this.loading = true;
    const req$ = this.isNew
      ? this.tripsService.addTrip(payload)
      : this.tripsService.updateTrip(this.code, payload);

    req$.subscribe({
      next: () => { this.loading = false; this.router.navigate(['/trips']); },
      error: (e) => { this.error = 'Save failed'; this.loading = false; console.error(e); }
    });
  }

  delete(): void {
    if (this.isNew) return;
    if (!confirm('Delete this trip?')) return;
    this.loading = true;
    this.tripsService.deleteTrip(this.code).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/trips']); },
      error: (e) => { this.error = 'Delete failed'; this.loading = false; console.error(e); }
    });
  }

  goBack(): void {
    this.router.navigate(['/trips']);
  }
}
