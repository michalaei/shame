import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromSystems from './systems/systems.reducer';


export interface State {
  [fromSystems.systemsFeatureKey]: fromSystems.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromSystems.systemsFeatureKey]: fromSystems.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
