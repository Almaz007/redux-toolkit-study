import { v4 as uuidv4 } from 'uuid';

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

export type AddTodoAction = {
	type: 'addTodo';
	payload: {
		text: string;
	};
};
export type StoreTodosAction = {
	type: 'storeTodos';
	payload: {
		todos: TodosState;
	};
};
export type RemoveTodoAction = {
	type: 'removeTodo';
	payload: {
		todoId: string;
	};
};
export type UpdateTodoAction = {
	type: 'updateTodo';
	payload: {
		todoId: string;
	};
};

export type TodoActions =
	| AddTodoAction
	| RemoveTodoAction
	| UpdateTodoAction
	| StoreTodosAction;

const todosInitialState: TodosState = {};

export const todosReducer = (
	state = todosInitialState,
	action: TodoActions
): TodosState => {
	switch (action.type) {
		case 'storeTodos': {
			return { ...initialTodos };
		}
		case 'addTodo': {
			const { text } = action.payload;
			const newTodo: Todo = {
				id: uuidv4(),
				text: text,
				completed: false
			};
			return { ...state, [newTodo.id]: newTodo };
		}
		case 'updateTodo': {
			const { todoId } = action.payload;
			const todo = state[todoId];
			return {
				...state,
				[todoId]: {
					...todo,
					completed: !todo.completed
				}
			};
		}
		case 'removeTodo': {
			const { todoId } = action.payload;

			const filteredArr = Object.entries(state).filter(
				item => item[0] !== todoId
			);
			const result = Object.fromEntries(filteredArr);
			return result;
		}
		default:
			return state;
	}
};
