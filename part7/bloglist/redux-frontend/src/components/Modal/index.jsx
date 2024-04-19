import styles from './styles.module.css';

const Modal = ({ children, close }) => {
	return (
		<div className={styles.modal_background}>
			<div className={styles.modal_container}>
				{children}
				{close && (
					<div className={styles.close_button}>
						<button onClick={close}>Close Modal</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Modal;
