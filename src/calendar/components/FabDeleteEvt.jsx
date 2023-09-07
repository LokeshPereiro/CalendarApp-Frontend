import { useCalendarStore } from "../../hooks";

export const FabDeleteEvt = () => {
  const { startDeleteEvent, hasEvtSelected } = useCalendarStore();

  const handleDeleteEvt = () => {
    startDeleteEvent();
  };
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDeleteEvt}
      style={{ display: !hasEvtSelected && "none" }}
    >
      <i className="fas fa-trash-alt" />
    </button>
  );
};
