import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ScheduleActions from './schedule.actions';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { AppError } from '../../shared/models/error.model';

@Injectable()
export class ScheduleEffects {
    constructor(
        private actions$: Actions,
        private scheduleService: ScheduleService
    ) { }

    loadSchedules$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ScheduleActions.loadSchedules),
            mergeMap(() =>
                this.scheduleService.getSchedules().pipe(
                    map((schedules) =>
                        ScheduleActions.loadSchedulesSuccess({ schedules })
                    ),
                    catchError((error: unknown) =>
                        of(
                            ScheduleActions.loadSchedulesFailure({
                                error: { message: String(error), code: 'LOAD_ERROR' },
                            })
                        )
                    )
                )
            )
        )
    );

    createSchedule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ScheduleActions.createSchedule),
            mergeMap(({ schedule }) =>
                this.scheduleService.createSchedule(schedule).pipe(
                    map((newSchedule) =>
                        ScheduleActions.createScheduleSuccess({ schedule: newSchedule })
                    ),
                    catchError((error: unknown) =>
                        of(
                            ScheduleActions.createScheduleFailure({
                                error: { message: String(error), code: 'CREATE_ERROR' },
                            })
                        )
                    )
                )
            )
        )
    );

    updateTrainerSchedule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ScheduleActions.updateTrainerSchedule),
            mergeMap(({ scheduleId, selectedDays }) =>
                this.scheduleService
                    .updateTrainerSchedule(scheduleId, selectedDays)
                    .pipe(
                        map((updatedSchedule) =>
                            ScheduleActions.updateTrainerScheduleSuccess({
                                schedule: updatedSchedule,
                            })
                        ),
                        catchError((error: unknown) =>
                            of(
                                ScheduleActions.updateTrainerScheduleFailure({
                                    error: { message: String(error), code: 'UPDATE_ERROR' },
                                })
                            )
                        )
                    )
            )
        )
    );
}