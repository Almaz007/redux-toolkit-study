import { useAppDispatch } from '../../store/store';
import { addTodoAction } from './todo.slice';
import styles from './todos.module.css';
import { FormEvent, useState } from 'react';

const AddTodo = () => {
	const [text, setText] = useState<string>('');
	const dispatch = useAppDispatch();

	const handleClick = (e: FormEvent) => {
		e.preventDefault();

		dispatch(addTodoAction({ text }));

		setText('');
	};

	return (
		<form className={styles['add__form']}>
			<input
				className={styles['todo__input']}
				type='text'
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<button onClick={handleClick}>Добавить</button>
		</form>
	);
};

export default AddTodo;
