import { useAppSelector } from '../../store/store';
import TodoItem from './TodoItem';
import styles from './todos.module.css';

const TodosList = () => {
	const todos = useAppSelector(state => state.todos);

	return (
		<div className={styles['todo__list']}>
			{Object.keys(todos).map(todoId => {
				const todo = todos[todoId];
				return <TodoItem key={todoId} todo={todo} />;
			})}
		</div>
	);
};

export default TodosList;
