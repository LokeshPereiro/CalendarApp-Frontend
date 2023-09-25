import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";

// const tempEvts = {
//   _id: new Date().getTime(),
//   title: "BirthDay Evt",
//   notes: "Buy big cake",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "#fafafa",
//   user: {
//     _id: "123xyz",
//     name: "Lokesh",
//   },
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    // events: [tempEvts],
    events: [],
    activeEvent: null,
  },
  reducers: {
    setActiveEvt: (state, { payload }) => {
      state.activeEvent = payload;
    },
    addNewEvt: (state, { payload }) => {
      state.events.push(payload);
      //Limpiar el evt activo para que se pueda insertar más eventos
      state.activeEvent = null;
    },
    updateCurrEvt: (state, { payload }) => {
      state.events = state.events.map((e) => {
        if (e.id === payload.id) {
          return payload;
        }
        return e;
      });
    },
    deleteCurrEvt: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (e) => e.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach((evt) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === evt.id);
        if (!exists) {
          state.events.push(evt);
        }
      });
    },
    onLogoutCalendar: (state) => {
      (state.isLoadingEvents = true),
        (state.events = []),
        (state.activeEvent = null);
    },
  },
});
export const {
  setActiveEvt,
  addNewEvt,
  updateCurrEvt,
  deleteCurrEvt,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
