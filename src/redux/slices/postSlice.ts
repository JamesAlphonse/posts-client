import { createSlice } from '@reduxjs/toolkit';
import { PostType } from '../../types/postType';

interface PostState {
  isLoading: boolean,
  posts: PostType[],
  filterText: string,
  filteredPosts: PostType[],
  viewingPostId: number,
  viewingPost: PostType | null,
}

const initialState: PostState = {
  isLoading: false,
  posts: [],
  filterText: '',
  filteredPosts: [],
  viewingPostId: -1,
  viewingPost: null,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPostsFetch: (state) => {
      state.isLoading = true;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.filteredPosts = state.posts;
      state.isLoading = false;
    },
    getPostsFailure: (state) => {
      state.isLoading = false;
    },
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
    setFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload;
    },
    setViewingPostId: (state, action) => {
      state.viewingPostId = action.payload;
    },
    setViewingPost: (state, action) => {
      state.viewingPost = action.payload;
    },
    savePost: (state, action: { payload: PostType }) => {
      const editedPost: PostType = action.payload;
      const postsIndex = state.posts.findIndex((post: PostType) => post.id === editedPost.id);
      const filteredPostsIndex = state.filteredPosts.findIndex((post: PostType) => post.id === editedPost.id);
      
      if(postsIndex >= 0) {
        state.posts[postsIndex] = editedPost;
      }

      if(filteredPostsIndex >= 0) {
        state.filteredPosts[filteredPostsIndex] = editedPost;
      }
    },
    deletePost: (state, action: {payload: PostType}) => {
      const editedPost: PostType = action.payload;
      const postsIndex = state.posts.findIndex((post: PostType) => post.id === editedPost.id);
      const filteredPostsIndex = state.filteredPosts.findIndex((post: PostType) => post.id === editedPost.id);

      if(postsIndex >= 0) {
        state.posts.splice(postsIndex, 1);
      }

      if(filteredPostsIndex >= 0) {
        state.filteredPosts.splice(filteredPostsIndex, 1);
      }
    }
  }
});

export const {
  getPostsFetch,
  getPostsSuccess,
  getPostsFailure,
  setFilterText,
  setFilteredPosts,
  setViewingPostId,
  setViewingPost,
  savePost,
  deletePost
} = postSlice.actions;

export default postSlice.reducer;