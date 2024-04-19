import { useNotification } from './contexts/notificationContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useUser } from './contexts/userContext';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

import UserInfo from './pages/UserInfo';
import BlogInfo from './pages/BlogInfo';
import Blogs from './pages/Blogs';
import Users from './pages/Users';

const App = () => {
	const { loggedUser } = useUser();
	const { notification } = useNotification();

	if (loggedUser === undefined) return;
	if (loggedUser === null) return <LoginForm />;

	return (
		<BrowserRouter>
			<Navbar />
			<div className='app_container'>
				<Notification message={notification.message} type={notification.type} />

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
