import { useEffect, useState } from "react";

import { localizer, getCalendarSpanish } from "../helpers";
import { useUiStore } from "../../hooks/useUiStore";
import { useAuthStore, useCalendarStore } from "../../hooks";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Navbar,
  CalendarEvtBox,
  CalendarModal,
  FabAddNew,
  FabDeleteEvt,
} from "..";
// const events = [
//   {
//     title: "BirthDay",
//     notes: "Buy cake",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: "#fafafa",
//     user: {
//       _id: "1234",
//       name: "Lokesh",
//     },
//   },
// ];

export const CalendarPage = () => {
  const { uiOpenDateModal } = useUiStore();
  const { user } = useAuthStore();

  const { events, onSetActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvt = user.uid === event.user._id || user.uid === event.user.uid;
    const style = {
      backgroundColor: isMyEvt ? "#347CF7" : "#465660",
      borderRadius: "10px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onViewChange = (evt) => {
    // console.log({ viewChanged: event });
    localStorage.setItem("lastView", evt);
    setLastView(evt);
  };

  const onDoubleClickEvt = (evt) => {
    // console.log({ doubleClick: evt });
    uiOpenDateModal(evt);
  };
  const onSelectEvt = (evt) => {
    // console.log({ click: evt });
    onSetActiveEvent(evt);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);
  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        components={{
          event: CalendarEvtBox,
        }}
        localizer={localizer}
        messages={getCalendarSpanish()}
        events={events}
        eventPropGetter={eventStyleGetter}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        onDoubleClickEvent={onDoubleClickEvt}
        onSelectEvent={onSelectEvt}
        onView={onViewChange}
        defaultView={lastView}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDeleteEvt />
    </>
  );
};
