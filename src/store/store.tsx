import { configureStore, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
	TodoActions,
	initialTodos,
	StoreTodosAction,
	todosReducer
} from '../modules/todo-slice/todo.slice';
import { TodosState } from '../modules/todo-slice/todo.slice';
// const reducer = combineReducers({
// 	counters: countersReducer,
// 	users: usersReducer
// });

type todosState = {
	todos: TodosState;
};

const todosInitialState: todosState = {
	todos: {}
};
type Action = TodoActions;
const reducer = (state = todosInitialState, action: Action): todosState => {
	return {
		todos: todosReducer(state.todos, action)
	};
};

export const store = configureStore({
	reducer: reducer
});

store.dispatch({
	type: 'storeTodos',
	payload: {
		todos: initialTodos
	}
} satisfies StoreTodosAction);
// store.dispatch(stored({ users }));

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>;
export const createAppSelector = createSelector.withTypes<AppState>();
