import { Link } from 'react-router-dom';
import LoggedUser from '../LoggedUser';

import styles from './styles.module.css';

const Navbar = () => {
	return (
		<div className={styles.navbar_container}>
			<div className={styles.navbar}>
				<Link to={'/'}>Blogs</Link>
				<Link to={'/users'}>Users</Link>
				<LoggedUser />
			</div>
		</div>
	);
};

export default Navbar;
