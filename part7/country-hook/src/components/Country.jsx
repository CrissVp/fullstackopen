const Country = ({ country }) => {
	if (!country) {
		return null;
	}

	if (!country.name) {
		return <div>not found...</div>;
	}

	return (
		<div>
			<h3>{country.name.common} </h3>
			<div>Capital {country.capital[0]} </div>
			<div>Population {country.population}</div>
			<img
				height='100'
				src={country.flags.svg}
				alt={`flag of ${country.name.common}`}
			/>
		</div>
	);
};

export default Country;
