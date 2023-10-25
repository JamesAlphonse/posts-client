import './modal.scss';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import EditPost from '../post/editPost';
import ConfirmDeletePost from '../post/confirmDeletePost';
import ModalContent from '../../types/modalContent';
import { XMarkIcon } from '@heroicons/react/24/outline';

function Modal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const modalContent: ModalContent = useSelector((state: RootState) => state.modal.modalContent);

  const setCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.target == e.currentTarget) {
      dispatch(closeModal());
    }
  };

  return (
    <div
      className={`modal ${isOpen ? 'modal-open' : 'modal-closed'}`}
      onClick={setCloseModal}>
      <div className='modal-inner'>
        <button
          className='modal-close'
          onClick={() => dispatch(closeModal())}>
          <XMarkIcon />
        </button>
        
        {modalContent === ModalContent.EditPost && <EditPost />}
        {modalContent === ModalContent.ConfirmDeletePost && <ConfirmDeletePost />}
      </div>
    </div>
  );
}

export default Modal;
