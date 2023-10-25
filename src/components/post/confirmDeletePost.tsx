import './confirmDeletePost.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import { deletePost } from '../../redux/slices/postSlice';
import { PostType } from '../../types/postType';
import { RootState } from '../../redux/store';
import Actions from '../actions/actions';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import CButton from '../button/button';

function ConfirmDeletePost() {
  const dispatch = useDispatch();

  const post: PostType | null = useSelector((state: RootState) => state.post.viewingPost);

  const onConfirmDeletePost = () => {
    if(post) {
      dispatch(deletePost(post));
    }
    dispatch(closeModal());
  };

  const onCancelDeletePost = () => {
    dispatch(closeModal());
  };

  return (
    <div className='confirmDeletePost'>
      <h1>Are you sure you want to delete this post?</h1>
      <Actions>
        <CButton
          type='button'
          onClick={onConfirmDeletePost}
          text='Confirm'>
          <CheckIcon />
        </CButton>
        <CButton
          type='button'
          onClick={onCancelDeletePost}
          text='Cancel'>
          <XMarkIcon />
        </CButton>
      </Actions>
    </div>
  );
}

export default ConfirmDeletePost;
