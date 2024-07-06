import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

export type UserId = string;
export type User = {
	id: UserId;
	name: string;
	description: string;
};
type UsersState = {
	ids: UserId[];
	entities: Record<UserId, User>;
	selectedUserId: UserId | undefined;
};

export const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
	id: `user${index + 11}`,
	name: `User ${index + 11}`,
	description: `Description for User ${index + 11}`
}));

const initialUsersState: UsersState = {
	ids: [],
	entities: {},
	selectedUserId: undefined
};

export const usersSlice = createSlice({
	name: 'users',
	initialState: initialUsersState,
	selectors: {
		selectSelectedUser: state =>
			state.selectedUserId && state.entities[state.selectedUserId],

		selectSortedUsers: createSelector(
			(state: UsersState) => state.ids,
			(state: UsersState) => state.entities,
			(_: UsersState, Sortype: 'asc' | 'desc') => Sortype,
			(ids, entities, sortType) =>
				ids
					.map(id => entities[id])
					.sort((a, b) => {
						if (sortType === 'asc') {
							return a.name.localeCompare(b.name);
						} else {
							return b.name.localeCompare(a.name);
						}
					})
		)
	},
	reducers: {
		stored: (state, action: PayloadAction<{ users: User[] }>) => {
			const { users } = action.payload;

			state.ids = users.map(user => user.id);
			state.entities = users.reduce((acc, user) => {
				acc[user.id] = user;
				return acc;
			}, {} as Record<UserId, User>);
		},
		selectUser: (state, action: PayloadAction<{ userId: UserId }>) => {
			const { userId } = action.payload;
			state.selectedUserId = userId;
		},
		removeSelectedUser: state => {
			state.selectedUserId = undefined;
		}
	}
});

export const { stored, selectUser, removeSelectedUser } = usersSlice.actions;
export const { selectSelectedUser, selectSortedUsers } = usersSlice.selectors;
export default usersSlice.reducer;

// export const usersReducer = (
// 	state = initialUsersState,
// 	action: Action
// ): UsersState => {
// 	console.log('users reducer');
// 	switch (action.type) {
// 		case 'storedUsers': {
// 			const { users } = action.payload;

// 			return {
// 				...state,
// 				ids: users.map(user => user.id),
// 				entities: users.reduce((acc, user) => {
// 					acc[user.id] = user;
// 					return acc;
// 				}, {} as Record<UserId, User>)
// 			};
// 		}
// 		case 'selectUser': {
// 			const { userId } = action.payload;

// 			return {
// 				...state,
// 				selectedUserId: userId
// 			};
// 		}
// 		case 'removeSelectedUser': {
// 			return {
// 				...state,
// 				selectedUserId: undefined
// 			};
// 		}
// 		default:
// 			return state;
// 	}
// };
