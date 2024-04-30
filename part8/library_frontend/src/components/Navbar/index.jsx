import styles from './styles.module.css';

const Navbar = ({ children }) => {
	return (
		<div className={styles.navbar_container}>
			<div className={styles.navbar}>{children}</div>
		</div>
	);
};

export default Navbar;
