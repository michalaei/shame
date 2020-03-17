import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {loadStats} from '../../actions/stats.actions';
import {SystemStat} from '../../models/system';
import {State} from '../index';


export const statsFeatureKey = 'stats';

export interface StatsState {
  stats: SystemStat[];
}

export const initialState: StatsState = {
  stats: []
};

const statsReducer = createReducer(
  initialState,
  on(loadStats, loadSystemStats)
);

export function reducer(state: StatsState | undefined, action: Action) {
  return statsReducer(state, action);
}

function loadSystemStats(state: StatsState, action): StatsState {
  const newStat = action.stats;
  const newState = state.stats.filter(stat => stat.serverId !== newStat.serverId);
  return {
    ...state,
    stats: [...newState, newStat]
  };
}

export const selectSystemsStats = (state: State) => state[statsFeatureKey];

export const systemsStatsSelector = createSelector(selectSystemsStats, (state) => state);

export const getSystemsStats = createSelector(systemsStatsSelector, (state) => state.stats);
