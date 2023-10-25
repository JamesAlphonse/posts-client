import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsFetch, setFilterText } from '../../redux/slices/postSlice';
import type { RootState } from '../../redux/store';
import './postCollection.scss';
import Post from '../post/post';

function PostCollection() {
  const posts = useSelector((state: RootState) => state.post.filteredPosts);
  const dispatch = useDispatch();
  /**
   * gets the target element input value and sets the post slice filter text filter
   * @param e change event for input element
   */
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value;
    dispatch(setFilterText(filterText));
  };

  useEffect(() => {
    dispatch(getPostsFetch());
  }, []);

  return (
    <div className='postCollection'>
      <input
        type="text"
        name="Search"
        className='postCollection-search'
        placeholder="Search by title..."
        onChange={onSearch}/>
      {
        posts.map((post, key) => {
          return (
            <Post
              key={ key }
              post={ post }/>
          );
        })
      }
    </div>
  );
}

export default PostCollection;
