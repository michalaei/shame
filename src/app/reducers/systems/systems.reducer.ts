import {System} from '../../models/system';
import {SystemsActions, SystemsActionTypes} from '../../actions/system.actions';
import {createSelector} from '@ngrx/store';


export const systemsFeatureKey = 'systems';

export interface State {
  systems: System[];
}

export const initialState: State = {
  systems: []
};

export function reducer(state = initialState, action: SystemsActions): State {
  switch (action.type) {
    case SystemsActionTypes.LoadSystems:
      return loadSystems(state, action.payload.systems);
    default:
      return state;
  }
}

function loadSystems(state: State, systems: System[]): State {
  return {
    ...state,
    systems
  };
}

export const selectSystems = (state: State) => state.systems;

export const systemsSelector = createSelector(selectSystems, (state) => state);
