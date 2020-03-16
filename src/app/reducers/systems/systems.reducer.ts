import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {loadSystemsAction} from '../../actions/system.actions';
import {System} from '../../models/system';
import {State} from '../index';


export const systemsFeatureKey = 'systems';

export interface SystemsState {
  systems: System[];
}

export const initialState: SystemsState = {
  systems: []
};

const systemsReducer = createReducer(
  initialState,
  on(loadSystemsAction, loadSystems)
);

export function reducer(state: SystemsState | undefined, action: Action) {
  return systemsReducer(state, action);
}

function loadSystems(state: SystemsState, action): SystemsState {
  return {
    ...state,
    systems: action.systems
  };
}

export const selectSystems = (state: State) => state[systemsFeatureKey];

export const systemsSelector = createSelector(selectSystems, (state) => state);

export const getSystems = createSelector(systemsSelector, (state) => state.systems);
