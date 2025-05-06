import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Schedule } from '../models/schedule.model';
import { AppError } from '../models/error.model';
import { AuthService, SafeUser } from '../../auth/auth.service';
import { environment } from '../../admin/components/models/environment';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    private apiUrl = 'https://6816da6926a599ae7c38bc56.mockapi.io/schedule';

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

        return this.http.get<Schedule[]>(this.apiUrl).pipe(
            map((schedules) => {
                console.log('All schedules fetched:', schedules);
                if (isAdmin) {
                    console.log('User is admin, returning all schedules');
                    return schedules;
                }
                
                const userId = user.id;
                
                const filteredSchedules = schedules.filter((schedule) => {
                    const scheduleTrainerId = typeof schedule.trainerId === 'string' ? parseInt(schedule.trainerId, 10) : schedule.trainerId;
                    const matches = scheduleTrainerId === userId;
                    console.log(`Comparing schedule.trainerId: ${scheduleTrainerId} with user.id: ${userId} - Match: ${matches}`);
                    return matches;
                });
                console.log(`Filtered schedules for trainer ID ${userId}:`, filteredSchedules);
                return filteredSchedules;
            }),
            catchError(this.handleError)
        );
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
        return this.http.get<Schedule>(`${this.apiUrl}/${scheduleId}`).pipe(
            map((schedule) => {
                const scheduleTrainerId = typeof schedule.trainerId === 'string' ? parseInt(schedule.trainerId, 10) : schedule.trainerId;
                console.log(`Updating schedule ID ${scheduleId} - User ID: ${user.id}, Schedule Trainer ID: ${scheduleTrainerId}`);
                if (scheduleTrainerId !== user.id) {
                    throw { message: 'Trainer not authorized for this schedule', code: 'AUTH_ERROR' };
                }
                return schedule;
            }),
            mergeMap((schedule) => {
                const updatedSchedule = {
                    ...schedule,
                    selectedDays,
                    status: 'responded',
                };
                return this.http
                    .put<Schedule>(`${this.apiUrl}/${scheduleId}`, updatedSchedule)
                    .pipe(catchError(this.handleError));
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse | AppError): Observable<never> {
        let appError: AppError;
        if ('message' in error && 'code' in error) {
            appError = error;
        } else {
            appError = {
                message: error.message || 'An error occurred',
                code: error instanceof HttpErrorResponse && error.status ? `HTTP_${error.status}` : 'UNKNOWN_ERROR',
            };
        }
        console.error('ScheduleService Error:', appError);
        return throwError(() => appError);
    }
}