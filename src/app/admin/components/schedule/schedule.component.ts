import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Schedule } from '../../../shared/models/schedule.model';
import { AppError } from '../../../shared/models/error.model';
import { AuthService, SafeUser } from '../../../auth/auth.service';
import * as ScheduleActions from '../../../store/schedule/schedule.actions';
import { selectLoading, selectError, selectSchedules } from '../../../store/schedule/schedule.selectors';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../admin/components/models/environment';
import { ScheduleState } from 'src/app/store/schedule/schedule.state';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
    trainerId: 0,
    adminId: 0,
    proposedDays: [],
    selectedDays: [],
    status: 'proposed',
  };
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  trainers: SafeUser[] = [];
  displayedColumns: string[] = ['trainer', 'proposedDays', 'selectedDays', 'status'];

  constructor(
    private store: Store<{ schedule: ScheduleState }>,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.schedules$ = this.store.select(selectSchedules);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    if (!this.isAdmin()) {
      console.log('not an admin');
      return;
    }
    const user = this.authService.getCurrentUser();
    if (user) {
      this.newSchedule.adminId = user.id;
    }
    this.store.dispatch(ScheduleActions.loadSchedules());
    this.http
      .get<SafeUser[]>(`${environment.adminTrainer}?role=trainer`)
             .subscribe({
        next: (trainers) => {
          this.trainers = trainers;
        },
        error: (err) => {
          console.error('failed to fetch trainers:', err);
        },
      });
  }

  onDayChange(event: MatCheckboxChange, day: string): void {
    const checked = event.checked;
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
      trainerId: 0,
      adminId: this.newSchedule.adminId,
      proposedDays: [],
      selectedDays: [],
      status: 'proposed',
    };
  }

  getTrainerName(trainerId: number): string {
    const trainer = this.trainers.find((t) => t.id === trainerId);
    return trainer ? trainer.name : 'Unknown';
  }
}