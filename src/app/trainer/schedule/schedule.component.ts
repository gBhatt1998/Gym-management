import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/shared/models/schedule.model';
import { AppError } from 'src/app/shared/models/error.model';
import { AuthService } from 'src/app/auth/auth.service';
import * as ScheduleActions from '../../store/schedule/schedule.actions';
import { selectLoading, selectError, selectSchedules } from '../../store/schedule/schedule.selectors';
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
  selectedDays: { [scheduleId: string]: string[] } = {};
  trainerId: number = 0;
  successMessage: string | null = null;

  constructor(
    private store: Store<{ schedule: ScheduleState }>,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.schedules$ = this.store.select(selectSchedules);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  isTrainer(): boolean {
    return this.authService.isTrainer();
  }

  ngOnInit() {
    if (!this.isTrainer()) {
      console.error('Access denied: User is not a trainer');
      return;
    }
    const user = this.authService.getCurrentUser();
    if (user) {
      this.trainerId = user.id;
      console.log(`Logged-in trainer ID: ${this.trainerId}`);
    } else {
      console.error('No user logged in');
      return;
    }
    this.store.dispatch(ScheduleActions.loadSchedules());

    this.schedules$.subscribe((schedules) => {
      console.log('Schedules displayed for trainer:', schedules);
      // Initialize selectedDays for each schedule
      schedules.forEach((schedule) => {
        if (schedule.id && !this.selectedDays[schedule.id]) {
          this.selectedDays[schedule.id] = [];
        }
      });
      if (this.successMessage) {
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 3000);
      }
    });

    this.error$.subscribe((error) => {
      if (error) {
        console.error('Error in schedule component:', error);
      }
    });
  }

  onDayChange(event: MatCheckboxChange, day: string, scheduleId: string): void {
    const checked = event.checked;
    console.log(`Day: ${day}, Schedule ID: ${scheduleId}, Checked: ${checked}`);

    if (!this.selectedDays[scheduleId]) {
      this.selectedDays[scheduleId] = [];
    }

    if (checked) {
      this.selectedDays[scheduleId].push(day);
    } else {
      this.selectedDays[scheduleId] = this.selectedDays[scheduleId].filter((d) => d !== day);
    }

    console.log(`Updated selectedDays for ${scheduleId}:`, this.selectedDays[scheduleId]);
    this.cdr.detectChanges();
  }

  submitResponse(scheduleId: string): void {
    if (!this.selectedDays[scheduleId]?.length) {
      console.warn(`No days selected for schedule ${scheduleId}`);
      return;
    }
    console.log(`Submitting response for schedule ${scheduleId}:`, this.selectedDays[scheduleId]);
    this.store.dispatch(
      ScheduleActions.updateTrainerSchedule({
        scheduleId,
        selectedDays: this.selectedDays[scheduleId],
      })
    );
    this.successMessage = 'Response submitted successfully!';
    this.selectedDays[scheduleId] = [];
    this.cdr.detectChanges();
  }
}