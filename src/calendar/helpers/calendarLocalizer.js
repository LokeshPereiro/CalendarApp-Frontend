//Importaciones para definir el localizer del calendario
import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enEs from "date-fns/locale/es";

const locales = {
  es: enEs,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: "#347CF7",
    borderRadius: "10px",
    opacity: 0.8,
    color: "white",
  };
  return {
    style,
  };
};
