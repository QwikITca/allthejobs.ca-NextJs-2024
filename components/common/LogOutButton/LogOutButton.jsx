import {signOut} from 'next-auth/react';
import {clearUser} from '@/features/user/userSlice';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';

const LogOutButton = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const userLogOut = async () => {
		await signOut({redirect: false});
		router.push('/');
		dispatch(clearUser());
	};

	return (
		<li className={`mb-1 loglist`}>
			<button onClick={() => userLogOut()} className="avatarButton">
				<i className={`la la-sign-out logicon`}></i> Log Out
			</button>
		</li>
	);
};

export default LogOutButton;
