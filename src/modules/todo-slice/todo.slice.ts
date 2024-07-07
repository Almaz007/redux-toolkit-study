import { v4 as uuidv4 } from 'uuid';
import { createReducer, createAction } from '@reduxjs/toolkit';

export type TodoId = string;

export type Todo = {
	id: TodoId;
	text: string;
	completed: boolean;
};
export type TodosState = Record<TodoId, Todo>;

export const initialTodos: TodosState = {
	'1': {
		id: '1',
		text: 'testovy text',
		completed: false
	},
	'2': {
		id: '2',
		text: 'testovy text',
		completed: false
	},
	'3': {
		id: '3',
		text: 'testovy text',
		completed: false
	},
	'4': {
		id: '4',
		text: 'testovy text',
		completed: false
	}
};

const todosInitialState: TodosState = {};

export const addTodoAction = createAction<{
	text: string;
}>('todos/addTodo');
export const removeTodoAction = createAction<{
	todoId: string;
}>('todos/removeTodo');
export const storeTodosAction = createAction('todos/storeTodos');
export const updateTodoAction = createAction<{
	todoId: string;
}>('todos/updateTodo');

export const todosReducer = createReducer(todosInitialState, builder => {
	builder.addCase(addTodoAction, (state, action) => {
		const { text } = action.payload;
		const newTodo: Todo = {
			id: uuidv4(),
			text: text,
			completed: false
		};
		state[newTodo.id] = newTodo;
	});
	builder.addCase(removeTodoAction, (state, action) => {
		const { todoId } = action.payload;

		const filteredArr = Object.entries(state).filter(
			item => item[0] !== todoId
		);
		return Object.fromEntries(filteredArr);
	});
	builder.addCase(updateTodoAction, (state, action) => {
		const { todoId } = action.payload;
		state[todoId].completed = !state[todoId].completed;
	});
	builder.addCase(storeTodosAction, () => {
		return { ...initialTodos };
	});
});
