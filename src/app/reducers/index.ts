import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromSystems from './systems/systems.reducer';
import * as fromRealities from './realities/realities.reducer';


export interface State {
  [fromSystems.systemsFeatureKey]: fromSystems.SystemsState;
  [fromRealities.realitiesFeatureKey]: fromRealities.RealitiesState;
}

export const reducers: ActionReducerMap<State> = {
  [fromSystems.systemsFeatureKey]: fromSystems.reducer,
  [fromRealities.realitiesFeatureKey]: fromRealities.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
