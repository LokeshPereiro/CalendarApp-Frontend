import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvts = {
  _id: new Date().getTime(),
  title: "BirthDay Evt",
  notes: "Buy big cake",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123xyz",
    name: "Lokesh",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvts],
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
        if (e._id === payload._id) {
          return payload;
        }
        return e;
      });
    },
    deleteCurrEvt: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (e) => e._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});
export const { setActiveEvt, addNewEvt, updateCurrEvt, deleteCurrEvt } =
  calendarSlice.actions;
