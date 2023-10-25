import './editPost.scss';
import type { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import { useState, useEffect, FormEvent } from 'react';
import { savePost } from '../../redux/slices/postSlice';
import Actions from '../actions/actions';
import { CheckIcon } from '@heroicons/react/24/outline';
import CButton from '../button/button';

function EditPost() {
  const dispatch = useDispatch();

  const viewingPost = useSelector((state: RootState) => state.post.viewingPost);

  const [workingPost, setWorkingPost] = useState({
    userId: -1,
    id: -1,
    title: '',
    body: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWorkingPost({
      ...workingPost,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(savePost(workingPost));
    dispatch(closeModal());
  };

  useEffect(() => {
    if(viewingPost) {
      setWorkingPost(viewingPost);
    }
  }, [viewingPost]);

  return (
    <form
      className='editPost'
      onSubmit={handleSave}>
      <input
        type="text"
        name="title"
        className="editPost-title"
        placeholder="title"
        value={workingPost.title}
        onChange={handleChange} />
      <textarea
        name="body"
        className="editPost-body"
        placeholder="content"
        value={workingPost.body}
        onChange={handleChange}
        spellCheck={false}></textarea>
      <Actions>
        <CButton
          type="submit"
          onClick={handleSave}
          text='Save'
        >
          <CheckIcon />
        </CButton>
      </Actions>
    </form>
  );
}

export default EditPost;
