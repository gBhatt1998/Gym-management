import { createSelector } from '@ngrx/store';
import { ScheduleState } from './schedule.state';
import { AppError } from '../../shared/models/error.model';

export const selectScheduleState = (state: { schedule: ScheduleState }) => state.schedule;

export const selectSchedules = createSelector(
    selectScheduleState,
    (state: ScheduleState) => state.schedules
);

export const selectLoading = createSelector(
    selectScheduleState,
    (state: ScheduleState) => state.loading
);

export const selectError = createSelector(
    selectScheduleState,
    (state: ScheduleState) => state.error
);