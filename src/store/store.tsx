import {
	combineReducers,
	configureStore,
	createSelector
} from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
	todosReducer,
	storeTodosAction
} from '../modules/todo-slice/todo.slice';
combineReducers;

const reducer = combineReducers({
	todos: todosReducer
});

export const store = configureStore({
	reducer: reducer
});

store.dispatch(storeTodosAction());
// store.dispatch(stored({ users }));

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>;
export const createAppSelector = createSelector.withTypes<AppState>();
