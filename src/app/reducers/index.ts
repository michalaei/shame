import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromSystems from './systems/systems.reducer';
import * as fromRealities from './realities/realities.reducer';
import * as fromStats from './stats/stats.reducer';


export interface State {
  [fromSystems.systemsFeatureKey]: fromSystems.SystemsState;
  [fromRealities.realitiesFeatureKey]: fromRealities.RealitiesState;
  [fromStats.statsFeatureKey]: fromStats.StatsState;
}

export const reducers: ActionReducerMap<State> = {
  [fromSystems.systemsFeatureKey]: fromSystems.reducer,
  [fromRealities.realitiesFeatureKey]: fromRealities.reducer,
  [fromStats.statsFeatureKey]: fromStats.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
