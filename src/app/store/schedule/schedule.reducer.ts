import { createReducer, on } from '@ngrx/store';
import { ScheduleState, initialState } from './schedule.state';
import * as ScheduleActions from './schedule.actions';

export const scheduleReducer = createReducer(
    initialState,
    on(ScheduleActions.loadSchedules, (state) => ({
        ...state,
        loading: true,
    })),
    on(ScheduleActions.loadSchedulesSuccess, (state, { schedules }) => ({
        ...state,
        schedules,
        loading: false,
        error: null,
    })),
    on(ScheduleActions.loadSchedulesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(ScheduleActions.createSchedule, (state) => ({
        ...state,
        loading: true,
    })),
    on(ScheduleActions.createScheduleSuccess, (state, { schedule }) => ({
        ...state,
        schedules: [...state.schedules, schedule],
        loading: false,
        error: null,
    })),
    on(ScheduleActions.createScheduleFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(ScheduleActions.updateTrainerSchedule, (state) => ({
        ...state,
        loading: true,
    })),
    on(ScheduleActions.updateTrainerScheduleSuccess, (state, { schedule }) => ({
        ...state,
        schedules: state.schedules.map((s) =>
            s.id === schedule.id ? schedule : s
        ),
        loading: false,
        error: null,
    })),
    on(ScheduleActions.updateTrainerScheduleFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);