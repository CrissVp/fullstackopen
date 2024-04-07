import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { value } = e.target;
		dispatch(filterChange(value));
	};

	return (
		<div className='filterInput'>
			<span>Filter:</span>
			<input type='text' name='filter' onChange={handleChange} />
		</div>
	);
};

export default Filter;
