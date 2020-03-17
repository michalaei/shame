import {createAction, props} from '@ngrx/store';
import {SystemStat} from '../models/system';

export const loadStats = createAction('[Stats] Load Stats', props<{ stats: SystemStat }>());




