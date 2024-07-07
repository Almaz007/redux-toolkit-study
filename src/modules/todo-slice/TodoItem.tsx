import styles from './todos.module.css';
import { removeTodoAction, Todo, updateTodoAction } from './todo.slice';
import { useAppDispatch } from '../../store/store';
import { memo } from 'react';

const TodoItem = memo(({ todo }: { todo: Todo }) => {
	const dispatch = useAppDispatch();
	console.log('render ' + todo.id);
	return (
		<div className={styles['todo__item']}>
			<p className={styles['todo__text']}>{todo.text}</p>
			<div className={styles['action__block']}>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => dispatch(updateTodoAction({ todoId: todo.id }))}
				/>
				<button
					onClick={() => dispatch(removeTodoAction({ todoId: todo.id }))}
					className={styles['delete__btn']}
				>
					Удалить
				</button>
			</div>
		</div>
	);
});
export default TodoItem;
