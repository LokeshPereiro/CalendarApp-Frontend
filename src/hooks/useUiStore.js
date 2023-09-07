import { useDispatch, useSelector } from "react-redux";
import { onOpenDateModal, onCloseDateModal } from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const uiOpenDateModal = () => {
    //DoubleClick open modal
    dispatch(onOpenDateModal());
  };
  const uiCloseDateModal = () => {
    dispatch(onCloseDateModal());
  };
  // const toogleDateModal = () => {
  //   isDateModalOpen ? uiOpenDateModal() : closeDateModal();
  // };

  return {
    //* Propiedades
    isDateModalOpen,

    //? Métodos
    uiOpenDateModal,
    uiCloseDateModal,
    // toogleDateModal,
  };
};
