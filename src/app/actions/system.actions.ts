import {Action} from '@ngrx/store';
import {System} from '../models/system';

export enum SystemsActionTypes {
  LoadSystems = '[System] Load Systems',
}

export class LoadSystems implements Action {
  readonly type = SystemsActionTypes.LoadSystems;

  constructor(public payload: { systems: System[] }) {
  }
}

export type SystemsActions = LoadSystems;
