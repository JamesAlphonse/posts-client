import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { getPostsSuccess, setFilteredPosts, setViewingPost } from '../slices/postSlice';
import { PostType } from '../../types/postType';

/**
 * initial API call to get posts from express server (proxy request)
 */
function* workGetPostsFetch(): any {
  const posts = yield call(() => fetch('/api/posts'));
  const formattedPosts = yield posts.json();
  yield put(getPostsSuccess(formattedPosts.data));
}

/**
 * filters post wall by text and sets the found posts
 * @param action text to filter posts by
 */
function* filterPosts(action: any): any {
  const filterText = action.payload;
  const filteredPosts = yield select(state => state.post.posts.filter((post: PostType) =>
    post.title.toLowerCase().includes(filterText.toLowerCase())
  ));

  yield put(setFilteredPosts(filteredPosts));
}

/**
 * finds a post by id and sets it as the currently viewing post
 * @param action post id to find post by
 */
function* findPostById(action: any): any {
  const id = action.payload;
  const post = yield select(state => state.post.filteredPosts.find((post: PostType) => 
    post.id === id
  ));
  yield put(setViewingPost(post));
}

/**
 * sets up generator functions for post saga
 */
export default function* postSaga() {
  yield takeEvery('posts/getPostsFetch', workGetPostsFetch);
  yield takeLatest('posts/setFilterText', filterPosts);
  yield takeLatest('posts/setViewingPostId', findPostById);
}