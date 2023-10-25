import { createSlice } from '@reduxjs/toolkit';
import ModalContent from '../../types/modalContent';

interface ModalState {
  isOpen: boolean,
  modalContent: ModalContent
}

const initialState: ModalState = {
  isOpen: false,
  modalContent: ModalContent.EditPost
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    setModalContent: (state, action: {payload: ModalContent}) => {
      state.modalContent = action.payload;
    }
  }
});

export const {
  openModal,
  closeModal,
  setModalContent
} = modalSlice.actions;
export default modalSlice.reducer;