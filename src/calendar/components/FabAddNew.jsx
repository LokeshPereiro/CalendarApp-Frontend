import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const FabAddNew = () => {
  const { uiOpenDateModal } = useUiStore();
  const { onSetActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    onSetActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123xryt",
        name: "Chanchito",
      },
    });
    uiOpenDateModal();
  };
  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus" />
    </button>
  );
};
