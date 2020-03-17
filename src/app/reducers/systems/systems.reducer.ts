import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {loadSystemsAction, toggleSystemGraphAction} from '../../actions/system.actions';
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
  on(loadSystemsAction, loadSystems),
  on(toggleSystemGraphAction, toggleSystemGraph)
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

function toggleSystemGraph(state: SystemsState, action): SystemsState {
  const newSystem = action.systemId;
  const isGraphOpen = action.isGraphOpen;
  let systemToUpdate = state.systems.find(system => system.id === newSystem);
  const newState = state.systems.filter(system => system.id !== newSystem);
  if (systemToUpdate) {
    systemToUpdate = Object.assign({}, systemToUpdate, {isGraphOpen});
    return {
      ...state,
      systems: [...newState, systemToUpdate]
    };
  } else {
    return {
      ...state,
      systems: [...newState]
    };
  }
}

export const selectSystems = (state: State) => state[systemsFeatureKey];

export const systemsSelector = createSelector(selectSystems, (state) => state);

export const getSystems = createSelector(systemsSelector, (state) => state.systems);
