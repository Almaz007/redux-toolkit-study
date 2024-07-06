import AddTodo from './modules/todo-slice/AddTodo';
import TodosList from './modules/todo-slice/TodosList';

function App() {
	return (
		<div className='main__block'>
			<h1 className='mb-2'>Redux</h1>
			<AddTodo />
			<TodosList />
		</div>
	);
}

export default App;
