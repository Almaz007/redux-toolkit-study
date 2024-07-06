import { AppState } from '../../store/store';
import { createAction, createReducer } from '@reduxjs/toolkit';

export type CounterState = {
	counter: number;
};
export type CounterId = string;
export type CountersState = Record<CounterId, CounterState | undefined>;

export const incrementAction = createAction<{
	counterId: CounterId;
}>('counters/increment');

export const decrementAction = createAction<{
	counterId: CounterId;
}>('counters/decrement');

const initialcounterState: CounterState = { counter: 0 };

const initialCountersState: CountersState = {};

export const countersReducer = createReducer(initialCountersState, builder => {
	console.log('countersReducers');
	builder.addCase(incrementAction, (state, action) => {
		const { counterId } = action.payload;

		if (!state[counterId]) {
			state[counterId] = { ...initialcounterState };
		}

		state[counterId]!.counter++;
	});
	builder.addCase(decrementAction, (state, action) => {
		const { counterId } = action.payload;

		if (!state[counterId]) {
			state[counterId] = { ...initialcounterState };
		}

		state[counterId]!.counter--;
	});
});

export const selectCounter = (state: AppState, counterId: CounterId) =>
	state.counters[counterId];
