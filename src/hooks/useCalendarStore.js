import { useDispatch, useSelector } from "react-redux";
import {
  setActiveEvt,
  addNewEvt,
  updateCurrEvt,
  deleteCurrEvt,
  onLoadEvents,
} from "../store";
import { calendarApi } from "../api";
import { convertsDateEvents } from "../calendar/helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSetActiveEvent = (calendarEvent) => {
    dispatch(setActiveEvt(calendarEvent));
  };

  const startSavingEvts = async (calendarEvt) => {
    try {
      if (calendarEvt.id) {
        //Actualizar
        await calendarApi.put(`/events/${calendarEvt.id}`, calendarEvt);
        dispatch(updateCurrEvt({ ...calendarEvt, user }));
        return;
      }
      const { data } = await calendarApi.post("/events", calendarEvt);
      // console.log(data);
      dispatch(addNewEvt({ ...calendarEvt, id: data.evento.id, user }));
    } catch (error) {
      // console.log(error);
      Swal.fire("Error al guardar", error.response.data?.msg, "error");
    }
  };

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(deleteCurrEvt());
    } catch (error) {
      Swal.fire("Error al eleiminar", error.response.data.msg, "error");
    }
  };
  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      // console.log(data);
      const events = convertsDateEvents(data.eventos);
      // console.log(events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
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
    startLoadingEvents,
  };
};
