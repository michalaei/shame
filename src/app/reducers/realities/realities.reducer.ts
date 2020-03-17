import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {changeRealityAction, loadRealitiesAction} from '../../actions/realities.actions';
import {State} from '../index';

export interface Reality {
  warriorReality: number;
  attackDemands: number;
  operationalPlans: number;
  ng: number;
  name: string;
}

export const realitiesFeatureKey = 'realities';

export interface RealitiesState {
  realities: Reality[];
  selectedReality: number;
}

export const initialState: RealitiesState = {
  realities: [],
  selectedReality: 0
};

const realitiesReducer = createReducer(
  initialState,
  on(loadRealitiesAction, loadRealities),
  on(changeRealityAction, selectReality)
);

export function reducer(state: RealitiesState | undefined, action: Action) {
  return realitiesReducer(state, action);
}

function loadRealities(state: RealitiesState, action): RealitiesState {
  return {
    ...state,
    realities: action.realities
  };
}

function selectReality(state: RealitiesState, action): RealitiesState {
  return {
    ...state,
    selectedReality: action.selectedReality
  };
}

export const selectRealities = (state: State) => state[realitiesFeatureKey];

export const realitiesSelector = createSelector(selectRealities, (state) => state);

export const getRealities = createSelector(realitiesSelector, (state) => state.realities);

export const getSelectedReality = createSelector(realitiesSelector, (state) => state.selectedReality);
