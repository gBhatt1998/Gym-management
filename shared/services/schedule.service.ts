import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Schedule } from '../models/schedule.model';
import { AppError } from '../models/error.model';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../admin/components/models/environment';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    private apiUrl = `${environment.adminTrainer}/schedules`; // Adjust based on your backend API

    constructor(private http: HttpClient, private authService: AuthService) { }

    getSchedules(): Observable<Schedule[]> {
        const user = this.authService.getCurrentUser();
        if (!user) {
            return throwError(() => ({
                message: 'User not authenticated',
                code: 'AUTH_ERROR',
            }));
        }
        const isAdmin = this.authService.isAdmin();
        const isTrainer = this.authService.isTrainer();
        if (!isAdmin && !isTrainer) {
            return throwError(() => ({
                message: 'User is not authorized to view schedules',
                code: 'AUTH_ERROR',
            }));
        }

        // Admins see all schedules, trainers see only their own
        const url = isAdmin ? this.apiUrl : `${this.apiUrl}?trainerId=${user.id}`;
        return this.http.get<Schedule[]>(url).pipe(catchError(this.handleError));
    }

    createSchedule(schedule: Schedule): Observable<Schedule> {
        if (!this.authService.isAdmin()) {
            return throwError(() => ({
                message: 'Only admins can create schedules',
                code: 'AUTH_ERROR',
            }));
        }
        const user = this.authService.getCurrentUser();
        if (!user) {
            return throwError(() => ({
                message: 'User not authenticated',
                code: 'AUTH_ERROR',
            }));
        }
        // Ensure adminId is set
        const scheduleWithAdminId = { ...schedule, adminId: user.id };
        return this.http
            .post<Schedule>(this.apiUrl, scheduleWithAdminId)
            .pipe(catchError(this.handleError));
    }

    updateTrainerSchedule(scheduleId: string, selectedDays: string[]): Observable<Schedule> {
        if (!this.authService.isTrainer()) {
            return throwError(() => ({
                message: 'Only trainers can update schedules',
                code: 'AUTH_ERROR',
            }));
        }
        const user = this.authService.getCurrentUser();
        if (!user) {
            return throwError(() => ({
                message: 'User not authenticated',
                code: 'AUTH_ERROR',
            }));
        }
        // Verify the schedule belongs to the trainer
        return this.http.get<Schedule>(`${this.apiUrl}/${scheduleId}`).pipe(
            map((schedule) => {
                if (schedule.trainerId !== user.id) {
                    throw { message: 'Trainer not authorized for this schedule', code: 'AUTH_ERROR' };
                }
                return schedule;
            }),
            mergeMap(() =>
                this.http
                    .patch<Schedule>(`${this.apiUrl}/${scheduleId}`, {
                        selectedDays,
                        status: 'responded',
                    })
                    .pipe(catchError(this.handleError))
            ),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse | AppError): Observable<never> {
        let appError: AppError;
        if ('message' in error) {
            // Already an AppError (e.g., from auth checks)
            appError = error;
        } else {
            // HTTP error
            
        }
        return throwError(() => appError);
    }
}