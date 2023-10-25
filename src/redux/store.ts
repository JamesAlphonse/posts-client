import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import postSaga from './sagas/postSaga';
import modalReducer from './slices/modalSlice';

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    post: postReducer,
    modal: modalReducer
  },
  middleware: [saga]
});
saga.run(postSaga);
export type RootState = ReturnType<typeof store.getState>;