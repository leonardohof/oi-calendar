import { connect } from "react-redux";

import { setCurrentEvent } from "../store/event/eventAction";
import {
  showAllCalendars,
  hideInstructions,
  showSettingsAddCalendar
} from "../store/event/eventActionLazy";

export default connect(
  (state, redux) => {
    const { events, auth } = state;
    const { EventDetails } = state.lazy;
    const signedIn = !!auth.user;
    console.log("[CALENDAR_REDUX]", events);
    const {
      currentEvent,
      currentEventType,
      myPublicCalendar,
      myPublicCalendarIcsUrl,
      publicCalendarEvents,
      publicCalendar,
      showInstructions
    } = events || {};

    let eventModal;
    if (currentEvent) {
      const eventType = currentEventType || "view"; // "add", "edit"
      const eventInfo = currentEvent;
      eventModal = { eventType, eventInfo };
    }

    const showGeneralInstructions = showInstructions
      ? showInstructions.general
      : true;

    return {
      events,
      signedIn,
      views: {
        EventDetails
      },
      eventModal,
      currentEvent,
      currentEventType,
      myPublicCalendar,
      myPublicCalendarIcsUrl,
      publicCalendarEvents,
      publicCalendar,
      showGeneralInstructions
    };
  },
  dispatch => {
    return {
      initializeLazyActions: () => {},
      showAllCalendars: () => {
        dispatch(showAllCalendars());
      },
      hideInstructions: () => {
        dispatch(hideInstructions());
      },
      showSettingsAddCalendar: url => {
        dispatch(showSettingsAddCalendar(url));
      },
      pickEventModal: eventModal => {
        console.log("[pickEventModal]", eventModal);
        const {
          eventType: currentEventType,
          eventInfo: currentEvent
        } = eventModal;
        dispatch(setCurrentEvent(currentEvent, currentEventType));
      }
    };
  }
);
