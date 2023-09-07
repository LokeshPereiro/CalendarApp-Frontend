import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks";
registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, uiCloseDateModal } = useUiStore();
  const { activeEvent, startSavingEvts } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "Default Title",
    notes: "Lorem lorem world..!",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  //Mostramos la clase is-valid según se hizo el submit o no
  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  //Exparcir los valores de la nota activa
  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onDateChange = (evt, changing) => {
    setFormValues({
      ...formValues,
      [changing]: evt,
    });
  };

  const onCloseModal = () => {
    // console.log("Cerrando el Modal..");
    uiCloseDateModal();
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setFormSubmitted(true);

    //Validar que la fecha final siempre sea mayor
    const difference = differenceInSeconds(formValues.end, formValues.start);
    //Diferencias negativas y NaN
    if (isNaN(difference) || difference <= 0) {
      //   console.log("Error en fechas");
      Swal.fire("Error en fechas", "Revisar los datos introducidos", "error");
      return;
    }
    if (formValues.title.length <= 0) return;
    // console.log({ formValues });

    await startSavingEvts(formValues);
    uiCloseDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>Nuevo evento</h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className="form-control mx-1"
            dateFormat={"Pp"}
            onChange={(evt) => onDateChange(evt, "start")}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
          {/* <input className="form-control" placeholder="Fecha inicio" /> */}
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control mx-1"
            dateFormat={"Pp"}
            onChange={(evt) => onDateChange(evt, "end")}
            showTimeSelect
            locale="es"
          />
          {/* <input className="form-control" placeholder="Fecha inicio" /> */}
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-success btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
