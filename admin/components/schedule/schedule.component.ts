import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Schedule } from '../../../shared/models/schedule.model';
import { AppError } from '../../../shared/models/error.model';
import { AuthService } from '../../../auth/auth.service';
import { AdminTrainerResponse } from '../../../admin/components/models/trainerdetail';
import * as ScheduleActions from '../../../store/schedule/schedule.actions';
import { selectSchedules, selectLoading, selectError } from '../../../store/schedule/schedule.selectors';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../admin/components/models/environment';
import { ScheduleState } from 'src/app/store/schedule/schedule.state';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  schedules$: Observable<Schedule[]>;
  loading$: Observable<boolean>;
  error$: Observable<AppError | null>;
  newSchedule: Schedule = {
    trainerId: '',
    adminId: '',
    proposedDays: [],
    selectedDays: [],
    status: 'proposed',
  };
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  trainers: AdminTrainerResponse[] = [];

  constructor(
    private store: Store<{ schedule: ScheduleState }>,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.schedules$ = this.store.select(selectSchedules);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      console.error('Access denied: User is not an admin');
      return;
    }
    const user = this.authService.getCurrentUser();
    if (user) {
      this.newSchedule.adminId = user.id; // Set adminId dynamically
    }
    this.store.dispatch(ScheduleActions.loadSchedules());
    // Fetch trainers
    this.http
      .get<AdminTrainerResponse[]>(`${environment.adminTrainer}?role=trainer`)
      .subscribe({
        next: (trainers) => {
          this.trainers = trainers;
        },
        error: (err) => {
          console.error('Failed to fetch trainers:', err);
        },
      });
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onDayChange(event: Event, day: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.newSchedule.proposedDays.push(day);
    } else {
      this.newSchedule.proposedDays = this.newSchedule.proposedDays.filter((d) => d !== day);
    }
  }

  onSubmit(): void {
    if (!this.newSchedule.trainerId || !this.newSchedule.proposedDays.length) {
      return;
    }
    this.store.dispatch(ScheduleActions.createSchedule({ schedule: { ...this.newSchedule } }));
    this.newSchedule = {
      trainerId: '',
      adminId: this.newSchedule.adminId, // Preserve adminId
      proposedDays: [],
      selectedDays: [],
      status: 'proposed',
    };
  }

  getTrainerName(trainerId: string): string {
    const trainer = this.trainers.find((t) => t.id === trainerId);
    return trainer ? trainer.name : 'Unknown';
  }
}