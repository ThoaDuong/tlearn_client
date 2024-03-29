import { configureStore } from "@reduxjs/toolkit";
import vocabularyReducer from './slices/vocaSlice';
import groupReducer from './slices/groupSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        vocabulary: vocabularyReducer,
        group: groupReducer,
        user: userReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch