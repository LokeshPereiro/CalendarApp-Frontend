import { useDispatch, useSelector } from "react-redux";
import {
  setActiveEvt,
  addNewEvt,
  updateCurrEvt,
  deleteCurrEvt,
} from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const onSetActiveEvent = (calendarEvent) => {
    dispatch(setActiveEvt(calendarEvent));
  };

  const startSavingEvts = async (calendarEvt) => {
    if (calendarEvt._id) {
      //Actualizar
      dispatch(updateCurrEvt({ ...calendarEvt }));
    } else {
      dispatch(addNewEvt({ ...calendarEvt, _id: new Date().getTime() }));
    }
  };
  const startDeleteEvent = () => {
    dispatch(deleteCurrEvt());
  };
  return {
    //*Prop
    events,
    activeEvent,
    hasEvtSelected: !!activeEvent,

    //!Metodos
    onSetActiveEvent,
    startSavingEvts,
    startDeleteEvent,
  };
};
