import {createAction, props} from '@ngrx/store';
import {Reality} from '../reducers/realities/realities.reducer';

export const loadRealitiesAction = createAction('[Realities] Load Realities', props<{ realities: Reality[] }>());

export const changeRealityAction = createAction('[Realities] Change Reality', props<{ selectedReality: number }>());
