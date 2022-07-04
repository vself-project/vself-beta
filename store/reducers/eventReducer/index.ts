import { Reducer } from 'redux';
import { mockEventActions } from '../../../mockData/mockEventActions';
import { mockEvent } from '../../../mockData/mockEvents';
import { Event } from '../../../models/Event';
import { AppStateTypes } from '../appStateReducer/types';
import { EventTypes } from './types';

const initialState: Event = {
  is_active: false,
  is_starting: false,
  event_data: null,
  event_stats: {},
  event_actions: [],
};

const eventReducer: Reducer = (state = initialState, action): Event => {
  switch (action.type) {
    case AppStateTypes.SetDevMode:
      return {
        ...state,
        event_data: mockEvent,
        event_actions: mockEventActions,
      };
    case EventTypes.SetEvent:
      return {
        ...state,
        ...action.payload,
      };
    case EventTypes.GetEventStatus:
      return {
        ...state,
        ...action.payload,
      };
    case EventTypes.CreateEvent:
      return {
        ...state,
        is_starting: true,
      };
    case EventTypes.StopCreateEvent:
      return {
        ...state,
        is_starting: false,
      };
    default:
      return state;
  }
};

export default eventReducer;
