import { PostType } from '../../types/postType';
import './post.scss';
import { useDispatch } from 'react-redux';
import { setViewingPostId } from '../../redux/slices/postSlice';
import { openModal, setModalContent } from '../../redux/slices/modalSlice';
import ModalContent from '../../types/modalContent';
import { ReactNode } from 'react';
import Actions from '../actions/actions';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import CButton from '../button/button';

function Post(props: {
  post: PostType,
  children?: ReactNode
}) {
  const dispatch = useDispatch();

  const onViewPost = () => {
    dispatch(setModalContent(ModalContent.EditPost));
    setViewingPostOpenModal();
  };

  const onDeletePost = () => {
    dispatch(setModalContent(ModalContent.ConfirmDeletePost));
    setViewingPostOpenModal();
  };

  const setViewingPostOpenModal = () => {
    dispatch(setViewingPostId(props.post.id));
    dispatch(openModal());
  };

  return (
    <article className='post'>
      <h1 className='post-title'>{ props.post.title }</h1>
      <p className='post-body'>{ props.post.body }</p>
      {props.children && props.children}
      <Actions>
        <CButton
          type='button'
          onClick={onViewPost}
          text='Edit'
        >
          <PencilIcon />
        </CButton>
        <CButton
          type='button'
          onClick={onDeletePost}
          text='Delete'
        >
          <TrashIcon />
        </CButton>
      </Actions>
    </article>
  );
}

export default Post;
