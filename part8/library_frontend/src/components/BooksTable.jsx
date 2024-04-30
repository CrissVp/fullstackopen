const BooksTable = ({ books }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Published</th>
				</tr>
			</thead>
			<tbody>
				{books?.map((b) => (
					<tr key={b.title}>
						<td>{b.title}</td>
						<td>{b.author.name}</td>
						<td>{b.published}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default BooksTable;
