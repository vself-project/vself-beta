import { EventTypes } from './types';

export const setOngoingEvents = (data: any) => {
  return {
    type: EventTypes.SetOngoingEvents,
    payload: { ...data },
  };
};

export const setActiveEvent = (data: any) => {
  return {
    type: EventTypes.SetActiveEvent,
    payload: { ...data },
  };
};

export const setActiveEventStatus = (is_active: boolean) => {
  return {
    type: EventTypes.GetEventStatus,
    payload: { is_active },
  };
};

export const createEvent = () => {
  return {
    type: EventTypes.CreateEvent,
  };
};

export const stopCreateEvent = () => {
  return {
    type: EventTypes.StopCreateEvent,
  };
};
