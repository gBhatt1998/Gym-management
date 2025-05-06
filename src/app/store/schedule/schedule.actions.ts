import { createAction, props } from '@ngrx/store';
import { Schedule } from '../../shared/models/schedule.model';
import { AppError } from '../../shared/models/error.model';

export const loadSchedules = createAction('[Schedule] Load Schedules');
export const loadSchedulesSuccess = createAction(
    '[Schedule] Load Schedules Success',
    props<{ schedules: Schedule[] }>()
);
export const loadSchedulesFailure = createAction(
    '[Schedule] Load Schedules Failure',
    props<{ error: AppError }>()
);

export const createSchedule = createAction(
    '[Schedule] Create Schedule',
    props<{ schedule: Schedule }>()
);
export const createScheduleSuccess = createAction(
    '[Schedule] Create Schedule Success',
    props<{ schedule: Schedule }>()
);
export const createScheduleFailure = createAction(
    '[Schedule] Create Schedule Failure',
    props<{ error: AppError }>()
);

export const updateTrainerSchedule = createAction(
    '[Schedule] Update Trainer Schedule',
    props<{ scheduleId: string; selectedDays: string[] }>()
);
export const updateTrainerScheduleSuccess = createAction(
    '[Schedule] Update Trainer Schedule Success',
    props<{ schedule: Schedule }>()
);
export const updateTrainerScheduleFailure = createAction(
    '[Schedule] Update Trainer Schedule Failure',
    props<{ error: AppError }>()
);