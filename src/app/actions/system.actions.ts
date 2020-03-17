import {createAction, props} from '@ngrx/store';
import {System} from '../models/system';

export const loadSystemsAction = createAction('[Systems Action Load Systems]', props<{ systems: System[] }>());
export const toggleSystemGraphAction = createAction('[Systems Action Toggle System Graph]',
  props<{ systemId: number, isGraphOpen: boolean }>());
