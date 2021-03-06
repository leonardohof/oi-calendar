import { SET_CALENDARS } from "../ActionTypes";

import { fetchCalendars, publishCalendars } from "../../io/event";
import { defaultCalendars } from "../../io/eventDefaults";

// ################
// When initializing app
// ################

function asAction_setCalendars(calendars) {
  return { type: SET_CALENDARS, payload: { calendars } };
}

export function initializeCalendars() {
  return async (dispatch, getState) => {
    return fetchCalendars().then(calendars => {
      if (!calendars) {
        calendars = defaultCalendars;
        // publish now as other devices fetch before storing
        publishCalendars(calendars);
      }
      if (calendars.length === 0) {
        calendars.push(defaultCalendars[0]);
        // publish now as other devices fetch before storing
        publishCalendars(calendars);
      }
      dispatch(asAction_setCalendars(calendars));
      return calendars;
    });
  };
}

// ################
// In Settings
// ################
export function addCalendar(calendar) {
  return async (dispatch, getState) => {
    fetchCalendars().then(calendars => {
      // TODO check for duplicates
      calendars.push(calendar);
      publishCalendars(calendars);
      dispatch(asAction_setCalendars(calendars));
    });
  };
}

export function deleteCalendars(deleteList) {
  return async (dispatch, getState) => {
    fetchCalendars().then(calendars => {
      const uids = deleteList.map(d => d.uid);
      const newCalendars = calendars.filter(d => {
        return !uids.includes(d.uid);
      });
      publishCalendars(newCalendars);
      dispatch(asAction_setCalendars(newCalendars));
    });
  };
}
