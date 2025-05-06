import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ScheduleActions from './schedule.actions';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Injectable()
export class ScheduleEffects {
    constructor(
        private actions$: Actions,
        private scheduleService: ScheduleService
    ) { }

    loadSchedules$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ScheduleActions.loadSchedules),
            mergeMap(() => {
                return this.scheduleService.getSchedules().pipe(
                    map(schedules => {
                        return ScheduleActions.loadSchedulesSuccess({ schedules: schedules });
                    }),
                    catchError(error => {
                        return of(ScheduleActions.loadSchedulesFailure({
                            error: { message: error.toString(), code: 'LOAD_ERROR' }
                        }));
                    })
                );
            })
        );
    });

    createSchedule$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ScheduleActions.createSchedule),
            mergeMap(action => {
                return this.scheduleService.createSchedule(action.schedule).pipe(
                    map(newSchedule => {
                        return ScheduleActions.createScheduleSuccess({ schedule: newSchedule });
                    }),
                    catchError(error => {
                        return of(ScheduleActions.createScheduleFailure({
                            error: { message: error.toString(), code: 'CREATE_ERROR' }
                        }));
                    })
                );
            })
        );
    });

    updateTrainerSchedule$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ScheduleActions.updateTrainerSchedule),
            mergeMap(action => {
                console.log(' update schedule ' + action.scheduleId + '  days:', action.selectedDays);
                return this.scheduleService.updateTrainerSchedule(action.scheduleId, action.selectedDays).pipe(
                    map(updatedSchedule => {
                        console.log('schedule updated:', updatedSchedule);
                        return ScheduleActions.updateTrainerScheduleSuccess({
                            schedule: updatedSchedule
                        });
                    }),
                    catchError(error => {
                        console.log('error updating schedule:', error);
                        return of(ScheduleActions.updateTrainerScheduleFailure({
                            error: { message: error.toString(), code: 'UPDATE_ERROR' }
                        }));
                    })
                );
            })
        );
    });
}