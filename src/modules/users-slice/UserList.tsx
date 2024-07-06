import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
	selectSelectedUser,
	selectSortedUsers,
	User,
	UserId,
	selectUser,
	removeSelectedUser
} from './users.slice';

export function UsersList() {
	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
	const selectedUser = useAppSelector(selectSelectedUser);
	const sortedUsers = useAppSelector(state =>
		selectSortedUsers(state, sortType)
	);

	console.log('hello render userList');
	return (
		<div className='flex flex-col items-center'>
			{!selectedUser ? (
				<div className='flex flex-col items-center justify-between'>
					<div className='flex flex-row items-center'>
						<button
							onClick={() => setSortType('asc')}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						>
							Asc
						</button>
						<button
							onClick={() => setSortType('desc')}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'
						>
							Desc
						</button>
					</div>
					<ul className='list-none'>
						{sortedUsers.map(user => (
							<UserListItem user={user} key={user.id} />
						))}
					</ul>
				</div>
			) : (
				<SelectedUser user={selectedUser} />
			)}
		</div>
	);
}
const UserListItem = memo(function UserListItem({ user }: { user: User }) {
	const dispatch = useAppDispatch();

	const handleUserClick = (userId: UserId) => {
		dispatch(selectUser({ userId }));
	};
	return (
		<li key={user.id} className='py-2' onClick={() => handleUserClick(user.id)}>
			<span className='hover:underline cursor-pointer'>{user.name}</span>
		</li>
	);
});

function SelectedUser({ user }: { user: User }) {
	const dispatch = useAppDispatch();

	const handleBackButtonClick = () => {
		dispatch(removeSelectedUser());
	};

	return (
		<div className='flex flex-col items-center'>
			<button
				onClick={handleBackButtonClick}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md'
			>
				Back
			</button>
			<h2 className='text-3xl'>{user.name}</h2>
			<p className='text-xl'>{user.description}</p>
		</div>
	);
}
