import { Schedule } from '../../shared/models/schedule.model';
import { AppError } from 'src/app/shared/models/error.model';

export interface ScheduleState {
    schedules: Schedule[];
    loading: boolean;
    error: AppError | null;
}

export const initialState: ScheduleState = {
    schedules: [],
    loading: false,
    error: null,
};