import styles from './todos.module.css';
import { RemoveTodoAction, Todo } from './todo.slice';
import { useAppDispatch } from '../../store/store';
import { UpdateTodoAction } from './todo.slice';
const TodoItem = ({ todo }: { todo: Todo }) => {
	const dispatch = useAppDispatch();
	return (
		<div className={styles['todo__item']}>
			<p className={styles['todo__text']}>{todo.text}</p>
			<div className={styles['action__block']}>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() =>
						dispatch({
							type: 'updateTodo',
							payload: {
								todoId: todo.id
							}
						} satisfies UpdateTodoAction)
					}
				/>
				<button
					onClick={() =>
						dispatch({
							type: 'removeTodo',
							payload: {
								todoId: todo.id
							}
						} satisfies RemoveTodoAction)
					}
					className={styles['delete__btn']}
				>
					Удалить
				</button>
			</div>
		</div>
	);
};

export default TodoItem;
