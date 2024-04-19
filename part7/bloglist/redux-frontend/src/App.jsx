import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { USER_STATES } from './reducers/userReducer';
import useUser from './hooks/useUser';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

import UserInfo from './pages/UserInfo';
import BlogInfo from './pages/BlogInfo';
import Blogs from './pages/Blogs';
import Users from './pages/Users';

const App = () => {
	const { userState } = useUser();

	if (userState === USER_STATES.UNKNOWN) return null;
	if (userState === USER_STATES.NOT_LOGGED) return <LoginForm />;

	return (
		<BrowserRouter>
			<Navbar />
			<div className='app_container'>
				<Notification />

				<Routes>
					<Route element={<Blogs />} path='/'></Route>
					<Route element={<BlogInfo />} path='/blogs/:id'></Route>
					<Route element={<UserInfo />} path='/users/:id'></Route>
					<Route element={<Users />} path='/users'></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
