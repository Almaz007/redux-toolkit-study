import { useAppSelector, useAppDispatch } from '../../store/store';
import { selectCounter } from './counters.slice';

import { CounterId, incrementAction, decrementAction } from './counters.slice';

export function Counter({ counterId }: { counterId: CounterId }) {
	const dispatch = useAppDispatch();
	const counterState = useAppSelector(state => selectCounter(state, counterId));

	return (
		<div className='flex flex-row items-center justify-center gap-5 '>
			counter {counterState?.counter}
			<button
				onClick={() => dispatch(incrementAction({ counterId: counterId }))}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				increment
			</button>
			<button
				onClick={() => dispatch(decrementAction({ counterId: counterId }))}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				decriment
			</button>
		</div>
	);
}
